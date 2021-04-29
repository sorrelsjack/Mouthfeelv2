import JwtDecode from 'jwt-decode';
import { Platform } from 'react-native';

export const InvertColor = (color: string) => {
    const padZero = (str: string, len: number = 2) => {
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }

    const convertHexToRgb = (hex: string) => {
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }

        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }

        if (hex.length !== 6) {
            throw new Error('Invalid HEX color.');
        }

        return hex;
    }

    if (!color.includes('rgb')) color = convertHexToRgb(color);

    // invert color components
    var r = (255 - parseInt(color.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(color.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(color.slice(4, 6), 16)).toString(16);

    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

export const ConvertHexToRgba = (hex: string, alpha: number = 1) => {
    if (!hex.includes('#')) return hex;

    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    else return "rgb(" + r + ", " + g + ", " + b + ")";
}

export const ConvertHexToRgbaArray = (hex: string, alpha: number = 1) => {
    if (!hex.includes('#')) return hex;

    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    
    return [r, g, b, alpha];
}

export const DetermineColorBrightness = (color: string) => {
    // Variables for red, green, blue values
    let r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1];
        g = color[2];
        b = color[3];
    }
    else {

        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(
            color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {

        return 'light';
    }
    else {

        return 'dark';
    }
}

export const GetTextColorBasedOnBrightness = (color: string) => {
    const brightness = DetermineColorBrightness(color);

    if (brightness === 'light') return '#000000'
    if (brightness === 'dark') return '#ffffff'
}

/*
    <= 1.0: Not perceptible
    1-2: Perceptible through close observation
    2-10: Perceptible at a glance
    11-49: Colors are more similar than opposite
    100: Colors are exact opposite
*/
// Source: https://github.com/antimatter15/rgb-lab
export const GetDeltaE = (rgbA: number[], rgbB: number[]) => {
    let labA = GetRgb2Lab(rgbA);
    let labB = GetRgb2Lab(rgbB);
    let deltaL = labA[0] - labB[0];
    let deltaA = labA[1] - labB[1];
    let deltaB = labA[2] - labB[2];
    let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
    let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
    let deltaC = c1 - c2;
    let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
    deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
    let sc = 1.0 + 0.045 * c1;
    let sh = 1.0 + 0.015 * c1;
    let deltaLKlsl = deltaL / (1.0);
    let deltaCkcsc = deltaC / (sc);
    let deltaHkhsh = deltaH / (sh);
    let i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
    return i < 0 ? 0 : Math.sqrt(i);
}

// Source: https://github.com/antimatter15/rgb-lab
export const GetRgb2Lab = (rgb: number[]) => {
    let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, x, y, z;
    r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
    x = (x > 0.008856) ? Math.pow(x, 1 / 3) : (7.787 * x) + 16 / 116;
    y = (y > 0.008856) ? Math.pow(y, 1 / 3) : (7.787 * y) + 16 / 116;
    z = (z > 0.008856) ? Math.pow(z, 1 / 3) : (7.787 * z) + 16 / 116;
    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}

export const JwtIsValid = (jwt: string | null) => {
    const currentTime = (new Date()).getTime() / 1000;
    const expiration = jwt ? JwtDecode(jwt).exp : 0;
    const expired = expiration <= currentTime;
    return !expired && !!jwt;
}

export const IsIos = () => Platform.OS === 'ios';
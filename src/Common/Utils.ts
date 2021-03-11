import JwtDecode from 'jwt-decode';

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

// TODO: Functions to go from hex to rgb or rgb to hex

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

export const JwtIsValid = (jwt: string | null) => {
    const currentTime = (new Date()).getTime() / 1000;
    const expiration = jwt ? JwtDecode(jwt).exp : 0;
    const expired = expiration <= currentTime;
    return !expired && !!jwt;
}
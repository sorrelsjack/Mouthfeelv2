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
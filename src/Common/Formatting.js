export const FormatAsTitleCase = (value) => {
    if (!value) return '';
    return value.replace(
        /\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
}
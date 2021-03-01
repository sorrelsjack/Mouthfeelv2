export const FormatAsTitleCase = (value: string) => {
    if (!value) return '';
    return value.replace(
        /\w\S*/g, (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
}


export const FormatCurrency = (value: string | number, currency: string = 'EGP'): string => {
    let numericValue: number;
    if (typeof value == 'string') {
        numericValue = parseFloat(value);
        if (isNaN(numericValue)) {
            return 'Invalid Number';
        }
    } else {
        numericValue = value;
    }
    // Round the numeric value to 2 decimals
    const roundedValue = numericValue.toFixed(2);

    // Add commas for every three digits
    const parts = roundedValue.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Combine the formatted value with the currency
    const formattedValue = parts.join('.') + ' ' + currency;
    return formattedValue;
};
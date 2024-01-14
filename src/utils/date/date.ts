
export const convertApiDate = (apiDate: { nanos: Number, seconds: number }) => {
    // Convert the seconds and nanoseconds to milliseconds
    const milliseconds = Number(apiDate.seconds) * 1000 + Number(apiDate.nanos) / 1000000;
    // Create a Date object
    return new Date(milliseconds);

}


export const checkExpiry = (date: string): boolean => {
    return new Date(date) > new Date()
}


export const getExpiryByPeriod = (hours: number): Date => {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + hours); // Set expiration to two hours from now
    return expirationDate

}

export const convertDateRedable = (date: Date) => {

    // if (typeof date.getTime == 'function')
    if (typeof date.getTime != 'function') {
        return "empty"
    }
    return date.toLocaleString('en-US', {
        timeZone: 'UTC', // Change this to your desired timezone
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });
}
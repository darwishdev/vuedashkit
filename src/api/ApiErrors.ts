export const criticalErrors: string[] = [
    'NetworkError when attempting to fetch resource.'
]

export const errorHandler: Record<number, Function> = {
    503: () => {
        // window.location.replace('/error')
        throw new Error('serverDown');
    },
    13: () => {
        throw new Error('internalServerError');

    },
    16: () => {
        localStorage.removeItem("token")
        window.location.replace('/login')
    },
    6: (error: any) => {
        const message = error.message.split(' ')
        throw new Error(message[1]);
    },
}
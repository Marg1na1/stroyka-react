export const cutString = (str: string, lengtn: number): string => {
    if (str.split('').length <= lengtn) {
        return str
    } else {
        return [...str.split('').splice(0, lengtn), '...'].join('')
    }
}
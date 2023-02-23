export const getToken = () => {
    const currentArr = document.cookie
        .split(';')
        .map((el) => el.split('='))
        .find((el) => el[0] === 'token')
    if (currentArr) {
        return currentArr[1]
    }
}
export const getCurrentPrice = (price: number, discountAmount: number | undefined): number => {

    if (discountAmount !== undefined) {
        return Math.round(price - price / 100 * discountAmount)
    }

    return Math.round(price - price / 100)
}
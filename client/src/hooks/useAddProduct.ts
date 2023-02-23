import { useAddCartItemMutation, useChangeCartItemMutation, useLazyGetCartQuery } from '../redux/injected/injectedCart';
import { useErrorHandler } from './useErrorHandler';

export const useAddProduct = () => {

    const [getCartItems, getStatuses] = useLazyGetCartQuery();

    const getErrorHandlerData = {
        error: getStatuses.error,
        isError: getStatuses.isError,
        isClient: false,
    }

    useErrorHandler({ ...getErrorHandlerData })

    const [addCartItem, addStatues] = useAddCartItemMutation();

    const addErrorHandlerData = {
        error: addStatues.error,
        isError: addStatues.isError,
        isClient: true,
        errorMessage: 'Произошла ошибка при попытке добавления товара в корзину',
    }

    useErrorHandler({ ...addErrorHandlerData })

    const [changeCartItem, changeStatuses] = useChangeCartItemMutation();

    const changeErrorHandlerData = {
        error: changeStatuses.error,
        isError: changeStatuses.isError,
        isClient: true,
        errorMessage: 'Произошла ошибка при попытке увеличения колличества товара',
    }

    useErrorHandler({ ...changeErrorHandlerData })

    const addProduct = async (id: string, count: number) => {

        const response = await getCartItems()

        if (response.data) {
            if (response.data.some((obj) => obj.product.id === id)) {
                const existingItem = response.data.find((obj) => obj.product.id === id)
                if (existingItem) {
                    await changeCartItem({ id: existingItem.product.id, count: existingItem.count + count })
                }
            }
            else {
                await addCartItem({ productId: id, count: count })
            }
        }
    }
    return addProduct
}
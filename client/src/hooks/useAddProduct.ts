import { TransmittedData } from '../@types/models';
import { useGetCartQuery, useAddCartItemMutation, useChangeCartItemMutation } from '../redux/injected/injectedCart';
import { useErrorHandler } from './useErrorHandler';

export const useAddProduct = () => {

    const { data = [] } = useGetCartQuery();

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

    const addProduct = async (item: TransmittedData) => {

        if (data.find((obj) => obj.fixId === item.fixId)) {
            const existingCount = data.find((obj) => obj.fixId === item.fixId)
            item.count += existingCount!.count
            item.id = +existingCount!.id
            await changeCartItem(item)
        } else {
            await addCartItem(item)
        }
    }

    return addProduct
}
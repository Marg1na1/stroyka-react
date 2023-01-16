import { TransmittedData } from "../@types/models"
import { useGetCartQuery, useAddCartItemMutation, useChangeCartItemMutation } from "../redux/injected/injectedCart";

export const useAddProduct = () => {

    const { data = [] } = useGetCartQuery();

    const [addCartItem] = useAddCartItemMutation();

    const [changeCartItem] = useChangeCartItemMutation();

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
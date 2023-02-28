import { FC, useEffect } from 'react';
import { ProductModel } from '../../types/models';
import { useErrorHandler } from 'hooks/useErrorHandler';
import { getCurrentPrice } from 'utils/getCurrentPrice';
import { useInputHandler } from 'hooks/useInputHandler';
import { useDebounce } from 'hooks/useDebounce';
import clsx from 'clsx';
import { useChangeCartItemMutation, useDeleteCartItemMutation } from 'redux/injected/injectedCart';
import style from './CartCard.module.scss';

type Props = {
    count: string;
    product: ProductModel;
}

const CartCard: FC<Props> = ({ count, product }) => {

    const {
        inputHandler,
        onClickMinus,
        onClickPlus,
        productAmount
    } = useInputHandler({ min: 0, max: 999, defaultCount: +count });

    const debounced = useDebounce(productAmount.toString(), 300);

    const item = { id: product.id, count: debounced };

    const [changeCartItem, changeStatuses] = useChangeCartItemMutation();

    const changeErrorData = {
        error: changeStatuses.error,
        isError: changeStatuses.isError,
        isClient: true,
        errorMessage: 'Произошла ошибка при попытке изменения колличества товара в корзине',
    }

    useErrorHandler({ ...changeErrorData })

    const [deleteCartItem, deleteStatuses] = useDeleteCartItemMutation();

    const deleteErrorData = {
        error: deleteStatuses.error,
        isError: deleteStatuses.isError,
        isClient: true,
        errorMessage: 'Произошла ошибка при попытке удаления товара из корзины',
    }

    useErrorHandler({ ...deleteErrorData })

    useEffect(() => {
        if (+debounced !== +count && +debounced) {
            changeCartItem(item)
        } else if (+debounced <= 0) {
            deleteCartItem(product.id)
        }
    }, [debounced])

    const clickDelete = async () => {
        await deleteCartItem(product.id)
    }

    return (
        <li className={style['cart-card']}>
            <img
                src={product.img}
                width={276}
                height={206}
                className={style['cart-card-img']}
                alt={product.title} />
            <div className={style['cart-card-main']}>
                <p className={style['cart-card__title']}>{product.title}</p>
                <b className={style['cart-card__price']}>{getCurrentPrice(product.price, product.discountAmount)}₽</b>
                <form className={style['cart-card-form']}>
                    <button type='button' className={clsx(style['cart-card-form__btn'], style['cart-card-form__btn--plus'])}
                        onClick={onClickPlus}></button>
                    <input type='number' className={style['cart-card-form__input']} value={productAmount}
                        onChange={e => inputHandler(e)} />
                    <button type='button' className={clsx(style['cart-card-form__btn'], style['cart-card-form__btn--minus'])}
                        onClick={onClickMinus}></button>
                </form>
            </div>
            <div className={style['cart-card-additional']}>
                <div className={style['cart-card__code']}>Код товара: {product.id}</div>
                <button className={style['cart-card__delete']} onClick={clickDelete} >Удалить товар</button>
            </div>
        </li>
    );
}

export default CartCard;
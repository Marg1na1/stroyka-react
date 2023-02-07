import { FC, useEffect } from 'react';
import { useInputHandler } from '../../hooks/useInputHandler';
import { CartProductModel } from '../../@types/models';
import { useDebounce } from '../../hooks/useDebounce';
import clsx from 'clsx';
import { useChangeCartItemMutation, useDeleteCartItemMutation } from '../../redux/injected/injectedCart';
import style from './CartCard.module.scss';

const CartCard: FC<CartProductModel> = ({ img, title, finalPrice, count, id }) => {

    const { inputHandler, onClickMinus, onClickPlus, productAmount } = useInputHandler({ min: 0, max: 999, defaultCount: count });

    const [changeCartItem] = useChangeCartItemMutation();

    const [deleteCartItem] = useDeleteCartItemMutation();

    const item = { id: id, count: productAmount };

    const debounced = useDebounce(productAmount.toString(), 300);

    useEffect(() => {
        if (productAmount !== 0) {
            changeCartItem(item)
        }
    }, [changeCartItem, debounced])

    useEffect(() => {
        if (productAmount <= 0) {
            deleteCartItem(id)
        }
    }, [productAmount])

    const clickDelete = async (id: string) => {
        await deleteCartItem(id)
    }

    return (
        <li className={style['cart-card']}>
            <img src={img} width={276} height={206} className={style['cart-card-img']} alt={title} />
            <div className={style['cart-card-main']}>
                <p className={style['cart-card__title']}>{title}</p>
                <b className={style['cart-card__price']}>{finalPrice}₽</b>
                <form className={style['cart-card-form']}>
                    <button type='button' className={clsx(style['cart-card-form__btn'], style['cart-card-form__btn--plus'])}
                        onClick={onClickPlus}
                    ></button>
                    <input type='number' className={style['cart-card-form__input']} value={productAmount}
                        onChange={e => inputHandler(e)} />
                    <button type='button' className={clsx(style['cart-card-form__btn'], style['cart-card-form__btn--minus'])}
                        onClick={onClickMinus}
                    ></button>
                </form>
            </div>
            <div className={style['cart-card-additional']}>
                <div className={style['cart-card__code']}>Код товара:
                    34078988-0047</div>
                <button className={style['cart-card__delete']} onClick={() => clickDelete(id)} >Удалить товар</button>
            </div>
        </li>
    );
}

export default CartCard;
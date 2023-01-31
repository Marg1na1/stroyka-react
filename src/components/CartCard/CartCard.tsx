import { FC, useState, useEffect } from 'react';
import { CartProductModel } from '../../@types/models';
import { useDebounce } from '../../hooks/useDebounce';
import clsx from 'clsx';
import { useChangeCartItemMutation, useDeleteCartItemMutation } from '../../redux/injected/injectedCart';
import style from './CartCard.module.scss';


const CartCard: FC<CartProductModel> = ({ img, title, finalPrice, count, id }) => {

    const [productCont, setProductCount] = useState(count);

    const [changeCartItem] = useChangeCartItemMutation();

    const [deleteCartItem] = useDeleteCartItemMutation(); 

    const item = { id: id, count: productCont };

    const debounced = useDebounce(productCont.toString(), 300);

    useEffect(() => {
        changeCartItem(item)
    }, [changeCartItem, debounced])

    useEffect(() => {
        setProductCount(count)
    }, [count])

    useEffect(() => {
        if (productCont <= 0) {
            deleteCartItem(id)
        }
    }, [deleteCartItem, id, productCont])

    const clickDelete = async (id: string) => {
        await deleteCartItem(id)
    }

    return (
        <li className={style['cart-card']}>
            <img src={img} width={276} height={206} className={style['cart-card-img']} alt={'product'} />
            <div className={style['cart-card-main']}>
                <p className={style['cart-card__title']}>{title}</p>
                <b className={style['cart-card__price']}>{finalPrice}₽</b>
                <form className={style['cart-card-form']}>
                    <button type='button' className={clsx(style['cart-card-form__btn'], style['cart-card-form__btn--plus'])}
                        onClick={() => setProductCount(prev => prev + 1)}
                    ></button>
                    <input type='string' className={style['cart-card-form__input']} value={productCont}
                        onChange={e => setProductCount(+e.target.value)} />
                    <button type='button' className={clsx(style['cart-card-form__btn'], style['cart-card-form__btn--minus'])}
                        onClick={() => setProductCount(prev => prev - 1)}
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
import clsx from 'clsx';
import { FC, useState, useEffect } from 'react';
import { TCartCard } from '../../@types/globalTypes';
import { useChangeCartItemMutation, useDeleteCartItemMutation } from '../../redux/injected/injectedCart';
import style from './CartCard.module.scss';


const CartCard: FC<TCartCard> = ({ img, title, finalPrice, count, id }) => {

    const [productCont, setProductCount] = useState(1);

    const [changeCartItem] = useChangeCartItemMutation();

    const [deleteCartItem] = useDeleteCartItemMutation();

    const item = { id: id, count: productCont };

    useEffect(() => {
        setProductCount(count)
    }, []);

    useEffect(() => {
        const close = async (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                await changeCartItem(item)
            }
        }
        window.addEventListener('keydown', close)

        return () => window.removeEventListener('keydown', close)
    });

    useEffect(() => {
        if (productCont <= 0) {
            deleteCartItem(id)
        }
    }, [productCont])

    const clickDelete = async (id: string) => {
        await deleteCartItem(id)
    };

    return (
        <li className={style['cart-card']}>
            <img src={img} width={276} height={206} className={style['cart-card-img']} />
            <div className={style['cart-card-main']}>
                <p className={style['cart-card__title']}>{title}</p>
                <b className={style['cart-card__price']}>{finalPrice}₽</b>
                <form action="" className={style['cart-card-form']}>
                    <button type='button' className={clsx(style['cart-card-form__btn'], style['cart-card-form__btn--plus'])}
                        onClick={() => setProductCount(productCont + 1)}
                    ></button>
                    <input type="string" className={style['cart-card-form__input']} value={productCont}
                        onChange={e => setProductCount(+e.target.value)} />
                    <button type='button' className={clsx(style['cart-card-form__btn'], style['cart-card-form__btn--minus'])}
                        onClick={() => setProductCount(productCont - 1)}
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
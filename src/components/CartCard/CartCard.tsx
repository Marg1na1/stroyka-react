import clsx from 'clsx';
import { FC } from 'react';
import { TCartCard } from '../../@types/globalTypes';
import { useDeleteCartItemMutation } from '../../redux/injected/injectedCart';
import style from './CartCard.module.scss';


const CartCard: FC<TCartCard> = ({ img, title, finalPrice, count, id }) => {

    const [deleteCartItem] = useDeleteCartItemMutation();

    const clickDelete = async (id: string) => {
        await deleteCartItem(id)
    }

    return (
        <li className={style['cart-card']}>
            <img src={img} width={276} height={206} className={style['cart-card-img']} />
            <div className={style['cart-card-main']}>
                <p className={style['cart-card__title']}>{title}</p>
                <b className={style['cart-card__price']}>{finalPrice}₽</b>
                <form action="" className={style['cart-card-form']}>
                    <button className={clsx(style['cart-card-form__btn'], style['cart-card-form__btn--plus'])}></button>
                    <input type="text" className={style['cart-card-form__input']} value={count} />
                    <button className={clsx(style['cart-card-form__btn'], style['cart-card-form__btn--minus'])}></button>
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
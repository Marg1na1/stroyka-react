import { FC } from 'react';
import style from './CartSide.module.scss';

const CartSide: FC = ({ }) => {
    return (
        <aside className={style['cart-side']}>
            <div className={style['cart-side-main']}>
                <h2 className={style['cart-side-title']}>
                        Итого
                </h2>
                <div className={style['cart-side-count']}>

                </div>
                <div className={style['cart-side-total']}>
        
                </div>
                <button className={style['cart-side-btn']}></button>
            </div>
            <div className={style['cart-side-info']}>
                
            </div>
        </aside>
    );
}

export default CartSide;
import { FC } from 'react';
import { Link } from 'react-router-dom';
import style from './Cart.module.scss';

const EmptyCart: FC = () => {
    return (
        <section className={style['empty']}>
            <div className="container">
                <div className={style['empty-wrapper']}>
                    <div className={style['empty-content']}>
                        <h1 className={style['empty__title']}>Упс!</h1>
                        <h2 className={style['empty__subtitle']}>Корзина пуста</h2>
                        <p className={style['empty__decr']}>Добавьте хотябы один товар в корзину чтобы сделать заказ</p>
                        <Link to={'/catalog'} className={style['empty__link']}>К покупкам</Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
export default EmptyCart;
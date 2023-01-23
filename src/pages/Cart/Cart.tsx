import { FC } from 'react';
import CartCard from '../../components/CartCard/CartCard';
import CartSide from '../../components/CartSide/CartSide';
import Headline from '../../components/Headline/Headline';
import EmptyPage from '../EmptyPage/EmptyPage';
import { headData } from '../../data/cart.data';
import clsx from 'clsx';
import { useGetCartQuery } from '../../redux/injected/injectedCart';
import style from './Cart.module.scss';

const emptyCartData = {
    title: 'Упс!',
    subtitle: 'Корзина пуста',
    descr: 'Добавьте хотябы один товар в корзину чтобы сделать заказ',
    link_txt: 'К покупкам',
    path: '/catalog'
}

const Cart: FC = () => {

    const { data = [], isSuccess } = useGetCartQuery();

    return (
        <section className={style['cart']}>
            {
                (isSuccess && data.length === 0) ?
                    <EmptyPage {...emptyCartData} /> :
                    <>
                        <Headline {...headData} />
                        <div className={clsx(style['cart-container'], 'container')}>
                            <CartSide data={data} />
                            <ul>
                                {
                                    data.map((obj) => (
                                        <CartCard {...obj} key={obj.fixId} />
                                    ))
                                }
                            </ul>
                        </div>
                    </>
            }
        </section>
    );
}

export default Cart;
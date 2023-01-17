import { FC } from 'react';
import clsx from 'clsx';
import CartCard from '../../components/CartCard/CartCard';
import CartSide from '../../components/CartSide/CartSide';
import Headline from '../../components/Headline/Headline';
import { headData } from '../../data/cart.data';
import { useGetCartQuery } from '../../redux/injected/injectedCart';
import EmptyPage from '../EmptyPage/EmptyPage';
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
                data.length > 0 ? <>
                    <Headline {...headData} />
                    <div className={clsx(style['cart-container'], 'container')}>
                        <CartSide data={data} />
                        <ul>
                            {
                                isSuccess && data.map((obj) => (
                                    <CartCard {...obj} key={obj.fixId} />
                                ))
                            }
                        </ul>
                    </div>
                </> : <EmptyPage {...emptyCartData} />
            }
        </section>
    );
}

export default Cart;
import { FC } from 'react';
import CartCard from '../../components/CartCard/CartCard';
import CartSide from '../../components/CartSide/CartSide';
import Headline from '../../components/Headline/Headline';
import EmptyPage from '../EmptyPage/EmptyPage';
import Cartskeleton from '../../components/Skeletons/Cartskeleton';
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

    const { data = [], isSuccess, isLoading, isError } = useGetCartQuery();

    const renderCartItems = data.map((obj) => <CartCard {...obj} key={obj.fixId} />);
    const renderSkeleton = [...new Array(3)].map((_, index) => <Cartskeleton key={index} />);

    if (isError) {
        return <>error</>
    }
    else if (isLoading) {
        return (
            <>
                <Headline {...headData} />
                <div className={clsx(style['cart-container'], 'container')}>
                    <CartSide data={data} />
                    <ul>
                        {renderSkeleton}
                    </ul>
                </div>
            </>
        )
    }
    else if (isSuccess && data.length === 0) {
        return <EmptyPage {...emptyCartData} />
    }

    return (
        <section className={style['cart']}>
            <>
                <Headline {...headData} />
                <div className={clsx(style['cart-container'], 'container')}>
                    <CartSide data={data} />
                    <ul>
                        {renderCartItems}
                    </ul>
                </div>
            </>
        </section>
    );
}

export default Cart;
import { FC } from 'react';
import { CartCard } from 'components/CartCard';
import { CartSide } from 'components/CartSide';
import { EmptyPage } from 'pages/EmptyPage';
import { Headline } from 'components/Headline';
import { CartSkeleton, SideSkeleton } from 'skeletons';
import { headData, emptyCartData } from 'data/cart.data';
import { useScrollToTop } from 'hooks/useScrollToTop';
import { useErrorHandler } from 'hooks/useErrorHandler';
import clsx from 'clsx';
import { useGetCartQuery } from 'redux/injected/injectedCart';
import style from './Cart.module.scss';

const Cart: FC = () => {

    useScrollToTop();

    const { data = [], isSuccess, isLoading, isError, error } = useGetCartQuery();

    const errorData = useErrorHandler({ error, isError });

    const errorObj = {
        title: errorData.status,
        subtitle: 'Произошла ошибка',
        descr: 'Произошла ошибка при получении товаров из корзины попробуйте обновить страницу или зайдите позже',
        link_txt: 'На главную',
        path: '/',
    }

    const renderCartItems = data.map((obj) => <CartCard {...obj} key={obj.id} />);
    const renderSkeleton = [...new Array(3)].map((_, index) => <CartSkeleton key={index} />);

    if (isLoading) {
        return (
            <section className={style['cart']}>
                <Headline {...headData} />
                <div className={clsx(style['cart-container'], 'container')}>
                    <SideSkeleton />
                    <ul>
                        {renderSkeleton}
                    </ul>
                </div>
            </section>
        )
    } else if (isError) {
        return <EmptyPage {...errorObj} />
    } else if (isSuccess && !data.length) {
        return <EmptyPage {...emptyCartData} />
    } else {
        return (
            <section className={style['cart']}>
                <Headline {...headData} />
                <div className={clsx(style['cart-container'], 'container')}>
                    <CartSide data={data} />
                    <ul>
                        {renderCartItems}
                    </ul>
                </div>
            </section>
        )
    }
}

export default Cart;
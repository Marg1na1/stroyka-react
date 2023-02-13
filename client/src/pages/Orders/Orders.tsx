import { FC } from 'react';
import Headline from '../../components/Headline/Headline';
import OrderCard from '../../components/OrderCard/OrderCard';
import EmptyPage from '../EmptyPage/EmptyPage';
import { headData, emptyOrdersData } from '../../data/orders.data';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useGetOrdersQuery } from '../../redux/injected/injectedOrders';
import style from './Orders.module.scss';

const Orders: FC = () => {

    useScrollToTop();

    const { data = [], isSuccess, isLoading, isError, error } = useGetOrdersQuery();

    const renderOrders = data.map((obj, i) => <OrderCard obj={obj} isLoading={isLoading} key={i} />);

    const errorData = useErrorHandler({ error, isError });

    const errorObj = {
        title: errorData.status,
        subtitle: 'Произошла ошибка',
        descr: 'Произошла ошибка при получении заказов попробуйте обновить страницу или зайдите позже',
        link_txt: 'На главную',
        path: '/',
    }

    if (isError) {
        return <EmptyPage {...errorObj} />
    }
    else if (isSuccess && !data.length) {
        return <EmptyPage {...emptyOrdersData} />

    } else {
        return (
            <section className={style['orders']}>
                <Headline {...headData} />
                <div className='container'>
                    <ul className={style['orders-list']}>
                        {renderOrders}
                    </ul>
                </div>
            </section>
        );
    }
}

export default Orders;
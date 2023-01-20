import { FC } from 'react';
import Headline from '../../components/Headline/Headline';
import OrderCard from '../../components/OrderCard/OrderCard';
import { headData } from '../../data/orders.data';
import { useGetOrdersQuery } from '../../redux/injected/injectedOrders';
import EmptyPage from '../EmptyPage/EmptyPage';
import style from './Orders.module.scss';

const emptyOrdersData = {
    title: 'Упс!',
    subtitle: 'Заказов нет',
    descr: 'Перейдите в корзину и сделайте хотябы один заказ',
    link_txt: 'В корзину',
    path: '/cart'
}

const Orders: FC = () => {

    const { data = [], isSuccess } = useGetOrdersQuery();

    return (
        <section className={style['orders']}>
            {
                isSuccess && data.length <= 0 ?
                    <EmptyPage {...emptyOrdersData} /> :
                    <>
                        <Headline {...headData} />
                        <div className='container'>
                            <ul className={style['orders-list']}>
                                {isSuccess &&
                                    data.map((obj, i) => (
                                        <OrderCard {...obj} key={i} />
                                    ))}
                            </ul>
                        </div>
                    </>
            }
        </section>
    );
}

export default Orders;

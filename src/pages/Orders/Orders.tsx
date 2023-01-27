import { FC } from 'react';
import Headline from '../../components/Headline/Headline';
import OrderCard from '../../components/OrderCard/OrderCard';
import EmptyPage from '../EmptyPage/EmptyPage';
import { headData } from '../../data/orders.data';
import { useGetOrdersQuery } from '../../redux/injected/injectedOrders';
import style from './Orders.module.scss';

const emptyOrdersData = {
    title: 'Упс!',
    subtitle: 'Заказов нет',
    descr: 'Перейдите в корзину и сделайте хотябы один заказ',
    link_txt: 'В корзину',
    path: '/cart'
}

const Orders: FC = () => {

    const { data = [], isSuccess, isLoading } = useGetOrdersQuery();

    const renderOrders = data.map((obj, i) => <OrderCard {...obj} key={i} />)

    if (isSuccess && data.length <= 0) {
        return <EmptyPage {...emptyOrdersData} />
    } else if (isLoading) {
        return (
            <section className={style['orders']}>
                <>
                    <Headline {...headData} />
                    <div className='container'>
                        <p>Загрузка...</p>
                    </div>
                </>
            </section>
        )
    }

    return (
        <section className={style['orders']}>
            {
                <>
                    <Headline {...headData} />
                    <div className='container'>
                        <ul className={style['orders-list']}>
                            {renderOrders}
                        </ul>
                    </div>
                </>
            }
        </section>
    );
}

export default Orders;

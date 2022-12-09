import { FC } from 'react';
import Headline from '../../components/Headline/Headline';
import OrderCard from '../../components/OrderCard/OrderCard';
import { headData } from '../../data/orders.data';
import { useGetOrdersQuery } from '../../redux/injected/injectedOrders';
import style from './Orders.module.scss';

const Orders: FC = ({ }) => {

    const { data = [] } = useGetOrdersQuery();

    return (
        <section className={style['orders']}>
            <Headline {...headData} />
            <div className="container">
                <ul className={style['orders-list']}>
                    {
                        data.map((obj, i) => (
                            <OrderCard {...obj} key={i} />
                        ))
                    }
                </ul>
            </div>
        </section>
    );
}

export default Orders;
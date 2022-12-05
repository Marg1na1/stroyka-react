import clsx from 'clsx';
import { FC } from 'react';
import CartCard from '../../components/CartCard/CartCard';
import CartSide from '../../components/CartSide/CartSide';
import Headline from '../../components/Headline/Headline';
import { headData } from '../../data/cart.data';
import { useGetCartQuery } from '../../redux/injected/injectedCart';
import style from './Cart.module.scss';
import EmptyCart from './EmptyCart';

const Cart: FC = ({ }) => {

    const { data = [], isLoading } = useGetCartQuery();

    return (
        <section className={style['cart']}>
            {
                data.length <= 0 ? <EmptyCart /> : <>
                    <Headline {...headData} />
                    <div className={clsx(style['cart-container'], 'container')}>
                        <CartSide data={data} />
                        <ul>
                            {

                                !isLoading && data.map((obj: any, i: number) => (
                                    <CartCard {...obj} key={i} />
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
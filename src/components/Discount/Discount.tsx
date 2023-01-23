import { FC } from 'react';
import Card from '../Card/Card';
import HorizontalSkeleton from '../Skeletons/HorizontalSkeleton';
import clsx from 'clsx';
import { useGetDiscountedProductsQuery } from '../../redux/injected/injectedDiscount';
import style from './Discount.module.scss';

const Discount: FC = () => {

    const { data = [], isLoading } = useGetDiscountedProductsQuery();

    const renderSkeleton = [...new Array(4)].map((_, index) => <HorizontalSkeleton key={index} />);
    const renderCards = data.map((item) => (<Card {...item} key={item.fixId} horizontal />));

    return (
        <section className={clsx(style['discount'], 'mb80')}>
            <div className='container'>
                <div className={style['discount-headline']}>
                    <h2 className={style['discount-title']}>Акции</h2>
                    <button className={clsx(style['discount-btn'], 'btn-reset')}>
                        Все акции
                        <svg fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' width={24} height={24}>
                            <path d='m9 18 6-6-6-6' stroke='#454950' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' />
                        </svg>
                    </button>
                </div>
                <ul className={style['grid']}>
                    {
                        isLoading ? renderSkeleton : renderCards
                    }
                </ul>
            </div>
        </section>
    );
}

export default Discount;
import React, { FC } from 'react';
import clsx from 'clsx';
import Card from '../Card/Card';
import style from './Discount.module.scss';
import { useGetDiscountedProductsQuery } from '../../redux/injected/injectedDiscount';

const Discount: FC = () => {

    const { data = [], isLoading } = useGetDiscountedProductsQuery();

    return (
        <section className={clsx(style['discount'], 'mb80')}>
            <div className='container'>
                <div className={style['discount-headline']}>
                    <h2 className={style['discount-title']}>Акции</h2>
                    <button className={clsx(style['discount-btn'], 'btn-reset')}>
                        Все акции
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="#454950" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <ul className={style['grid']}>
                    {
                        !isLoading && data.map((item) => (
                            <Card {...item} key={item.fixId} horizontal />
                        ))
                    }
                </ul>
            </div>
        </section>

    );
}

export default Discount;
import { FC, useState, useEffect, memo } from 'react';
import { ErrorSection } from 'components/ErrorSection';
import { Card } from 'components/Card';
import { HorizontalSkeleton, Skeleton } from 'skeletons';
import { MarkIcon } from 'icons';
import { useErrorHandler } from 'hooks/useErrorHandler';
import clsx from 'clsx';
import { useGetDiscountedProductsQuery } from 'redux/injected/injectedDiscount';
import style from './Discount.module.scss';

const Discount: FC = memo(() => {

    const { data = [], isLoading, isFetching, isError, error } = useGetDiscountedProductsQuery();

    const errorData = useErrorHandler({ error, isError });

    const [horizontal, setHorizontal] = useState(false);

    useEffect(() => {
        setHorizontal(window.innerWidth > 1100)
    }, [])

    const renderSkeleton = [...new Array(4)].map((_, index) => horizontal ? <HorizontalSkeleton key={index} /> : <Skeleton key={index} />);

    const renderCards = data.map((item) => <Card {...item} key={item.id} horizontal={horizontal} />);

    const errorObj = {
        errorCode: errorData.status,
        errorMessage: 'Произошла ошибка при получении акционных товаров попробуйте обновить страницу или зайдите позже'
    }

    return (
        <section className={clsx(style['discount'], 'mb80')}>
            <div className='container'>
                <div className={style['discount-headline']}>
                    <h2 className={style['discount-title']}>Акции</h2>
                    <button className={style['discount-btn']}>
                        Все акции
                        <MarkIcon />
                    </button>
                </div>
                {
                    isError ? <ErrorSection {...errorObj} /> : <ul className={style['grid']}>
                        {(isLoading || isFetching) ? renderSkeleton : renderCards}
                    </ul>
                }
            </div>
        </section >
    );
})

export default Discount;
import { FC, memo, useEffect, useState } from 'react';
import { Skeleton } from 'skeletons';
import { Card } from 'components/Card';
import { ErrorSection } from 'components/ErrorSection';
import { useErrorHandler } from 'hooks/useErrorHandler';
import { useGetPopularProductsQuery } from '../../redux/injected/injectedPopularProducts';
import style from './PopularProducts.module.scss';

const PopularProducts: FC = memo(() => {

    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        setIsTablet(window.innerWidth <= 650)
    }, [])

    const { data = [], isLoading, isFetching, isError, error } = useGetPopularProductsQuery(isTablet ? 6 : 12);

    const errorData = useErrorHandler({ error, isError })

    const renderSkeleton = [...new Array(8)].map((_, index) => <Skeleton key={index} />);
    const renderCards = data.map((obj) => <Card {...obj} key={obj.id} />);

    const errorObj = {
        errorCode: errorData.status,
        errorMessage: 'Произошла ошибка при получении популярных товаров попробуйте обновить страницу или зайдите позже'
    }

    return (
        <section className='mb80'>
            <div className='container'>
                <div className={style['popular-products-headline']}>
                    <h2 className={style['popular-products__title']}>Популярные товары</h2>
                </div>
                {
                    isError ? <ErrorSection {...errorObj} /> : <ul className={style['grid']}>
                        {(isFetching || isLoading) ? renderSkeleton : renderCards}
                    </ul>
                }
            </div>
        </section>
    );
})

export default PopularProducts;
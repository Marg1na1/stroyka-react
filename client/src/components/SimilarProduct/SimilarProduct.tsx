import { FC } from 'react';
import Card from '../Card/Card';
import Skeleton from '../Skeletons/Skeleton';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import ErrorSection from '../ErrorSection/ErrorSection';
import { useGetSimilarQuery } from '../../redux/injected/injectedSimilarProducts';
import style from './SimilarProduct.module.scss';

const SimilarProduct: FC<{ type: string }> = ({ type }) => {

    const { data = [], isLoading, isFetching, isError, error } = useGetSimilarQuery(type);

    const errorData = useErrorHandler({ error, isError });

    const errorObj = {
        errorCode: errorData.status,
        errorMessage: 'Произошла ошибка при получении похожих товаров попробуйте обновить страницу или зайдите позже'
    }

    const renderCards = data.map((obj) => <Card {...obj} key={obj.fixId} />);
    const renderSkeleton = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className={style['similar-product']}>
            <h1 className={style['title']}>Похожие товары</h1>
            {
                isError ? <ErrorSection {...errorObj} /> : <ul className={style['grid']}>
                    {(isLoading || isFetching) ? renderSkeleton : renderCards}
                </ul>
            }
        </div>
    );
}

export default SimilarProduct;
import { FC } from 'react';
import Card from '../Card/Card';
import Skeleton from '../Skeletons/Skeleton';
import { useGetSimilarQuery } from '../../redux/injected/injectedSimilarProducts';
import style from './SimilarProduct.module.scss';

const SimilarProduct: FC<{ type: string }> = ({ type }) => {

    const { data = [], isSuccess } = useGetSimilarQuery(type);

    const renderCards = data.map((obj) => <Card {...obj} key={obj.fixId} />);
    const renderSkeleton = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className={style['similar-product']}>
            <h1 className={style['title']}>Похожие товары</h1>
            <ul className={style['grid']}>
                {
                    isSuccess ? renderCards : renderSkeleton
                }
            </ul>
        </div>
    );
}

export default SimilarProduct;
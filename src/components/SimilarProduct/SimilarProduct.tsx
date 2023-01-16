import { FC } from 'react';
import { useGetSimilarQuery } from '../../redux/injected/injectedSimilarProducts';
import Card from '../Card/Card';
import style from './SimilarProduct.module.scss';

type SimilarProductProps = {
    type: string
}

const SimilarProduct: FC<SimilarProductProps> = ({ type }) => {

    const { data = [], isSuccess } = useGetSimilarQuery(type);

    return (
        <div className={style['similar-product']}>
            <h1 className={style['title']}>Похожие товары</h1>
            <ul className={style['grid']}>
                {
                    isSuccess && data.map((obj) => (
                        <Card {...obj} key={obj.fixId} />
                    ))
                }
            </ul>
        </div>
    );
}

export default SimilarProduct;
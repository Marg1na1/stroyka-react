import { FC } from 'react';
import Card from '../Card/Card';
import Skeleton from '../Skeletons/Skeleton';
import { useGetPopularProductsQuery } from '../../redux/injected/injectedPopularProducts';
import style from './PopularProducts.module.scss';

const PopularProducts: FC = () => {

    const { data = [], isLoading } = useGetPopularProductsQuery();

    const skeletonSnip = [...new Array(8)].map((_, index) => <Skeleton key={index} />);
    const loadedSnip = data.map((obj) => (<Card {...obj} key={obj.fixId} />));

    return (
        <section className={style['popular-products']}>
            <div className='container'>
                <div className={style['popular-products-headline']}>
                    <h2 className={style['popular-products__title']}>Популярные товары</h2>
                </div>
                <ul className={style['grid']}>
                    {
                        isLoading ? skeletonSnip : loadedSnip
                    }
                </ul>
            </div>
        </section>
    );
}

export default PopularProducts;
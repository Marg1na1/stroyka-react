import { FC } from 'react';
import SimilarProduct from '../../components/SimilarProduct/SimilarProduct';
import ProductCard from '../../components/ProductCard/ProductCard';
import Headline from '../../components/Headline/Headline';
import { categoryData } from '../../data/catalog.data';
import { THeadlineBreadcrumbs } from '../../@types/globalTypes';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import EmptyPage from '../EmptyPage/EmptyPage';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import Loader from '../../components/Loader/Loader';
import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '../../redux/injected/injectedProduct';
import style from './Product.module.scss';

const Product: FC = () => {

    useScrollToTop();

    const { id } = useParams();

    const { data, isSuccess, isLoading, isError, error } = useGetProductQuery(id!);

    const errorData = useErrorHandler({ error, isError });

    const errorObj = {
        title: errorData.status,
        subtitle: 'Произошла ошибка',
        descr: `Произошла ошибка при получении товара попробуйте обновить страницу или зайдите позже`,
        link_txt: 'Главная',
        path: '/',
    }

    let productType = {
        path: ' ',
        title: ' '
    };

    if (isSuccess) {
        categoryData.forEach((obj) => obj.list.forEach((obj) => obj.path.split('/')[1] === data.type ? productType = obj : null))
    }

    const breadcrumbsArr: THeadlineBreadcrumbs[] = [
        { path: '/', title: 'Главная', type: 'link' },
        { title: '→', type: 'seperator' },
        { path: '/catalog', title: 'Каталог', type: 'link' },
        { title: '→', type: 'seperator' },
        { path: `/catalog/${productType.path}`, title: productType.title, type: 'link' },
        { title: '→', type: 'seperator' },
        { path: '', title: isSuccess ? data.title : 'empty', type: 'link' },
    ]

    const headData = {
        breadcrumbs: breadcrumbsArr,
    }
    if (isLoading) {
        return <Loader />
    }
    else if (isError) {
        return <EmptyPage {...errorObj} />
    } else {
        return (
            <section className={style['product-card']}>
                {
                    isSuccess && <div className='container'>
                        <Headline {...headData} />
                        <ProductCard data={data} />
                        <SimilarProduct type={data.type} />
                    </div>
                }
            </section>
        );
    }
}

export default Product;
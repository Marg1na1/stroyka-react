import { FC } from 'react';
import SimilarProduct from '../../components/SimilarProduct/SimilarProduct';
import ProductCard from '../../components/ProductCard/ProductCard';
import Headline from '../../components/Headline/Headline';
import { categoryData } from '../../data/catalog.data';
import { THeadlineBreadcrumbs } from '../../@types/globalTypes';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '../../redux/injected/injectedProduct';
import style from './Product.module.scss';
import EmptyPage from '../EmptyPage/EmptyPage';
import { useErrorHandler } from '../../hooks/useErrorHandler';

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

    let testObj = {
        path: ' ',
        title: ' '
    };

    if (isSuccess) {
        categoryData.forEach((obj) => obj.list.forEach((obj) => obj.path.split('/')[1] === data.type ? testObj = obj : null))
    }

    const breadcrumbsArr: THeadlineBreadcrumbs[] = [
        { path: '/', title: 'Главная', type: 'link' },
        { title: '→', type: 'seperator' },
        { path: '/catalog', title: 'Каталог', type: 'link' },
        { title: '→', type: 'seperator' },
        { path: `/catalog/${testObj.path}`, title: testObj.title, type: 'link' },
        { title: '→', type: 'seperator' },
        { path: '', title: isSuccess ? data.title : 'empty', type: 'link' },
    ]

    const headData = {
        breadcrumbs: breadcrumbsArr,
    }

    if (isError) {
        return <EmptyPage {...errorObj} />
    } else if (isSuccess) {
        return (
            <section className={style['product-card']}>
                <div className='container'>
                    {
                        isSuccess &&
                        <>
                            <Headline {...headData} />
                            <ProductCard data={data} />
                            <SimilarProduct type={data.type} />
                        </>
                    }
                </div>
            </section>
        );
    } else {
        return (
            <section className={style['product-card']}>
                <div className='container'>
                    {/* <Headline {...headData} /> */}
                </div>
            </section>
        );
    }
}

export default Product;
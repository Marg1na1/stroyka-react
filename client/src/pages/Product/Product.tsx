import { FC } from 'react';
import { categoryData } from 'data/catalog.data';
import { BreadcrumbsModel } from 'types/models';
import { useScrollToTop } from 'hooks/useScrollToTop';
import { EmptyPage } from 'pages/EmptyPage';
import { useErrorHandler } from 'hooks/useErrorHandler';
import { Loader } from 'spinners/Loader';
import { Headline } from 'components/Headline';
import { ProductCard } from 'components/ProductCard';
import { SimilarProduct } from 'components/SimilarProduct';
import { useParams } from 'react-router-dom';
import { useGetProductQuery } from 'redux/injected/injectedProduct';
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

    const breadcrumbsArr: BreadcrumbsModel[] = [
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
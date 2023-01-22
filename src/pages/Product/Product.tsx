import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { categoryData } from '../../data/catalog.data';
import { useGetProductQuery } from '../../redux/injected/injectedProduct';
import style from './Product.module.scss';
import SimilarProduct from '../../components/SimilarProduct/SimilarProduct';
import ProductCard from '../../components/ProductCard/ProductCard';
import Headline from '../../components/Headline/Headline';
import { THeadlineBreadcrumbs } from '../../@types/globalTypes';

const Product: FC = ({ }) => {

    const { id } = useParams();

    const { data, isSuccess } = useGetProductQuery(id!);

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
}

export default Product;
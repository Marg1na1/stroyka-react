import { FC } from 'react';
import BrandsRow from './BrandsRow/BrandsRow';
import Headline from '../../components/ui/Headline/Headline';
import { headData } from '../../data/brands.data';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import Loader from '../../components/Loader/Loader';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import EmptyPage from '../EmptyPage/EmptyPage';
import { useGetBrandsQuery } from '../../redux/injected/injectedBrands';
import clsx from 'clsx';
import style from './Brands.module.scss';

const Brands: FC = () => {

    useScrollToTop();

    const { data = [], isLoading, isFetching, isError, error } = useGetBrandsQuery();

    const errorData = useErrorHandler({ error, isError });

    const errorObj = {
        title: errorData.status,
        subtitle: 'Произошла ошибка',
        descr: 'Произошла ошибка при получении списка брендов  попробуйте обновить страницу или зайдите позже',
        link_txt: 'На главную',
        path: '/',
    }

    if (isLoading || isFetching) {
        return <Loader />
    } else if (isError) {
        return <EmptyPage {...errorObj} />
    } else {
        return (
            <section className={style['brands']}>
                <Headline {...headData} />
                <div className='container'>
                    <nav className={clsx(style['brands-nav'], 'mb80')}>
                        {
                            data.map((obj, i) => (
                                <a href={'#' + obj.title} className={style['brands-nav__item']} key={i}>
                                    {obj.title}
                                </a>
                            ))
                        }
                    </nav>
                    <ul className={style['brands-list']}>
                        {
                            data.map((obj, i) => (
                                <BrandsRow {...obj} key={i} />
                            ))
                        }
                    </ul>
                </div>
            </section>
        );
    }
}

export default Brands;
import { FC } from 'react';
import CatalogItem from './CatalogItem/CatalogItem';
import Headline from '../../components/ui/Headline/Headline';
import Loader from '../../components/Loader/Loader';
import EmptyPage from '../EmptyPage/EmptyPage';
import { headData } from '../../data/catalog.data';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { useGetCatalogQuery } from '../../redux/injected/injectedCatalog';
import style from './Catalog.module.scss';


const Catalog: FC = () => {

    useScrollToTop();

    const { data = [], isError, isLoading, error } = useGetCatalogQuery();

    const errorData = useErrorHandler({ error, isError });

    const errorObj = {
        title: errorData.status,
        subtitle: 'Произошла ошибка',
        descr: 'Произошла ошибка при списка категорий попробуйте обновить страницу или зайдите позже',
        link_txt: 'На главную',
        path: '/',
    }

    if (isLoading) {
        return <Loader />
    } else if (isError) {
        return <EmptyPage {...errorObj} />
    } else {
        return (
            <section className={style['catalog']}>
                <Headline {...headData} />
                <div className='container'>
                    <ul className={style['catalog-list']}>
                        {
                            data.map((obj, i) => (
                                <CatalogItem {...obj} key={i} />
                            ))
                        }
                    </ul>
                </div>
            </section>
        );
    }
}

export default Catalog;
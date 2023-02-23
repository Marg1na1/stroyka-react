import { FC } from 'react';
import CatalogItem from '../../components/CatalogItem/CatalogItem';
import Headline from '../../components/Headline/Headline';
import { headData } from '../../data/catalog.data';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { useGetCatalogQuery } from '../../redux/injected/injectedCatalog';
import style from './Catalog.module.scss';

const Catalog: FC = () => {

    useScrollToTop();

    const { data = [], isSuccess } = useGetCatalogQuery();

    return (
        <section className={style['catalog']}>
            <Headline {...headData} />
            <div className='container'>
                <ul className={style['catalog-list']}>
                    {isSuccess && data.map((obj, i) => (
                        <CatalogItem {...obj} key={i} />
                    ))
                    }
                </ul>
            </div>
        </section>
    );
}

export default Catalog;
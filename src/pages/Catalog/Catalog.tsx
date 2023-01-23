import { FC } from 'react';
import CatalogItem from '../../components/CatalogItem/CatalogItem';
import Headline from '../../components/Headline/Headline';
import { categoryData, headData } from '../../data/catalog.data';
import style from './Catalog.module.scss';

const Catalog: FC = () => {

    return (
        <section className={style['catalog']}>
            <Headline {...headData} />
            <div className='container'>
                <ul className={style['catalog-list']}>
                    {
                        categoryData.map((obj, i) => (
                            <CatalogItem {...obj} key={i} />
                        ))
                    }
                </ul>
            </div>
        </section>
    );
}

export default Catalog;
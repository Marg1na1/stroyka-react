import { FC, useEffect } from 'react';
import BrandsRow from '../../components/BrandsRow/BrandsRow';
import Headline from '../../components/Headline/Headline';
import { headData } from '../../data/brands.data';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import clsx from 'clsx';
import style from './Brands.module.scss';
import { useGetBrandsQuery } from '../../redux/injected/injectedBrands';

const Brands: FC = () => {

    useScrollToTop();

    const { data, isSuccess } = useGetBrandsQuery()

    return (
        <section className={style['brands']}>
            <Headline {...headData} />
            <div className='container'>
                <nav className={clsx(style['brands-nav'], 'mb80')}>
                    {
                        isSuccess && data.map((obj, i) => (
                            <a href={'#' + obj.title} className={style['brands-nav__item']} key={i}>
                                {obj.title}
                            </a>
                        ))
                    }
                </nav>
                <ul className={style['brands-list']}>
                    {
                        isSuccess && data.map((obj, i) => (
                            <BrandsRow {...obj} key={i} />
                        ))
                    }
                </ul>
            </div>
        </section>
    );
}

export default Brands;
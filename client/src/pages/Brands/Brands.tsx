import clsx from 'clsx';
import { FC } from 'react';
import BrandsRow from '../../components/BrandsRow/BrandsRow';
import Headline from '../../components/Headline/Headline';
import { brandsList, headData } from '../../data/brands.data';
import style from './Brands.module.scss';

const Brands: FC = () => {

    return (
        <section className={style['brands']}>
            <Headline {...headData} />
            <div className="container">
                <nav className={clsx(style['brands-nav'], 'mb80')}>
                    {
                        brandsList.map((obj, i) => (
                            <a href='#' className={style['brands-nav__item']} key={i}>
                                {obj.title}
                            </a>
                        ))
                    }
                </nav>
                <ul className={style['brands-list']}>
                    {
                        brandsList.map((obj, i) => (
                            <BrandsRow {...obj} key={i} />
                        ))
                    }
                </ul>
            </div>
        </section>
    );
}

export default Brands;
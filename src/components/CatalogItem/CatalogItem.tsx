import { FC } from 'react';
import { Link } from 'react-router-dom';
import { TCategory } from '../../data/catalog.data';
import style from './CatalogItem.module.scss';

const CatalogItem: FC<TCategory> = ({ title, image, list }) => {

    return (
        <ul className={style['catalog-item']}>
            <div className={style['catalog-item-header']}>
                <h2 className={style['catalog-item__title']}>{title}</h2>
                <img src={image} alt="catalog item bage" className={style['catalog-item__img']} />
            </div>
            <ul className={style['list']}>
                {
                    list.map((obj, i) => (
                        <li className={style['list-item']} key={i}>
                            <Link to={obj.path} className={style['list-link']}>{obj.title}</Link>
                        </li>
                    ))
                }
            </ul>
        </ul>
    );
}

export default CatalogItem;
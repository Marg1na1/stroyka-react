import { FC, useState } from 'react';
import { TCategory } from '../../../data/catalog.data';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import style from './CatalogItem.module.scss';

const CatalogItem: FC<TCategory> = ({ title, image, list }) => {

    const [dropdown, setDropdown] = useState(false);

    const toogleDropdown = () => {
        setDropdown(!dropdown)
    }

    return (
        <li className={style['catalog-item']}>
            <div className={style['catalog-item-header']}>
                <h2 className={style['catalog-item__title']}>{title}</h2>
                <img src={image} alt={title} className={style['catalog-item__img']} width={180} height={180} />
            </div>
            <button className={style['dropdown-btn']} onClick={toogleDropdown}>
                Категории
            </button>
            <ul className={clsx(style['dropdown'], {
                [style['dropdown--visible']]: dropdown
            })}>
                {
                    list.map((obj, i) => (
                        <li className={style['dropdown__item']} key={i}>
                            <Link to={obj.path} className={style['dropdown__link']}>{obj.title}</Link>
                        </li>
                    ))
                }
            </ul>
            <ul className={style['list']}>
                {
                    list.map((obj, i) => (
                        <li className={style['list-item']} key={i}>
                            <Link to={obj.path} className={style['list-link']}>{obj.title}</Link>
                        </li>
                    ))
                }
            </ul>
        </li>
    );
}

export default CatalogItem;
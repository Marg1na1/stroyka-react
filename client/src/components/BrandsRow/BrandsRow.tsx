import { FC } from 'react';
import { TBrands } from '../../@types/globalTypes';
import style from './BrandsRow.module.scss';

const BrandsRow: FC<TBrands> = ({ title, list }) => {
    return (
        <li className={style['brands-row']}>
            <h2 className={style['brands-row__title']}>
                {title}
            </h2>
            <ul className={style['brands-row-grid']}>
                {
                    list.map((item, i) => (
                        <li key={i} className={style['brands-row-item']}>{item}</li>
                    ))
                }
            </ul>
        </li>
    );
}

export default BrandsRow;
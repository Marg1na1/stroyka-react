import { FC, useState } from 'react';
import { TBrands } from '../../../@types/globalTypes';
import MarkIcon from '../../../Icons/MarkIcon';
import clsx from 'clsx';
import style from './BrandsRow.module.scss';

const BrandsRow: FC<TBrands> = ({ title, list }) => {

    const [toggleDropdown, setToggleDropdown] = useState(false);

    const onClickRow = () => {
        setToggleDropdown(!toggleDropdown)
    }

    return (
        <li className={style['brands-row']} id={title} >
            <h2 className={style['brands-row__title']}>
                {title}
            </h2>
            <button className={clsx(style['brands-row__btn'], {
                [style['brands-row__btn--active']]: toggleDropdown
            })} onClick={onClickRow}>
                {title}
                <MarkIcon />
            </button>
            <ul className={clsx(style['brands-row-grid'], {
                [style['brands-row-grid--active']]: toggleDropdown
            })}>
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
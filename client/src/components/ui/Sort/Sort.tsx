import { FC, useState, useEffect } from 'react';
import { useSort } from '../../../hooks/useSort';
import { SortTypeModel } from '../../../@types/models';
import MarkIcon from '../../../Icons/MarkIcon';
import clsx from 'clsx';
import style from './Sort.module.scss';

const Sort: FC = () => {

    const { sortState, onClickSortItem } = useSort();
    
    const [dropdown, setDropdown] = useState(false);

    useEffect(() => {
        setDropdown(false)
    }, [sortState])

    const toggleDropdown = () => {
        setDropdown(!dropdown)
    }

    const sortItems: SortTypeModel[] = [
        {
            label: 'Популярные',
            title: 'popular'
        },
        {
            label: 'Дешевле',
            title: 'cheaper'
        },
        {
            label: 'Дороже',
            title: 'expensive'
        },
        {
            label: 'По алфавиту',
            title: 'alphabetically'
        }
    ]

    return (
        <div className={style['select']}>
            <button
                className={clsx(style['select-btn'], {
                    [style['select-btn--active']]: dropdown
                })}
                onClick={toggleDropdown}
            >{sortState.label} <MarkIcon /></button>
            <ul className={clsx(style['sort'], {
                [style['sort--active']]: dropdown
            })}>
                <li className={style['sort__item']}>
                    <button className={clsx(style['sort__btn'], {
                        [style['sort__btn--active']]: sortState.label === sortItems[0].label
                    })}
                        onClick={() => onClickSortItem(sortItems[0])}>Популярные</button>
                </li>
                <li className={style['sort__item']}>
                    <button className={clsx(style['sort__btn'], {
                        [style['sort__btn--active']]: sortState.label === sortItems[1].label
                    })}
                        onClick={() => onClickSortItem(sortItems[1])}>Дешевле</button>
                </li>
                <li className={style['sort__item']}>
                    <button className={clsx(style['sort__btn'], {
                        [style['sort__btn--active']]: sortState.label === sortItems[2].label
                    })}
                        onClick={() => onClickSortItem(sortItems[2])}>Дороже</button>
                </li>
                <li className={style['sort__item']}>
                    <button className={clsx(style['sort__btn'], {
                        [style['sort__btn--active']]: sortState.label === sortItems[3].label
                    })}
                        onClick={() => onClickSortItem(sortItems[3])}>По алфавиту</button>
                </li>
            </ul>
        </div>
    );
}

export default Sort;
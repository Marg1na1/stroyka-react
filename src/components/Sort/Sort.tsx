import { FC, useState, useEffect } from 'react';
import { useSort } from '../../hooks/useSort';
import MarkIcon from '../../Icons/MarkIcon';
import clsx from 'clsx';
import style from './Sort.module.scss';

const Sort: FC = () => {

    const { sortState, onClickSortItem } = useSort();
    const [selected, setSelected] = useState<boolean[]>([]);
    const [dropdown, setDropdown] = useState(false);

    useEffect(() => {
        const selectedArr = sortState.map((obj) => obj.value)
        setSelected(selectedArr)
        setDropdown(false)
    }, [sortState])

    const toggleDropdown = () => {
        setDropdown(!dropdown)
    }

    return (
        <div className={style['select']}>
            <button
                className={clsx(style['select-btn'], {
                    [style['select-btn--active']]: dropdown
                })}
                onClick={toggleDropdown}
            >{sortState.find((obj) => obj.value === true)?.label} <MarkIcon /></button>
            <ul className={clsx(style['sort'], {
                [style['sort--active']]: dropdown
            })}>
                <li className={style['sort__item']}>
                    <button className={clsx(style['sort__btn'], {
                        [style['sort__btn--active']]: selected[0]
                    })}
                        onClick={() => onClickSortItem('Популярные')}>Популярные</button>
                </li>
                <li className={style['sort__item']}>
                    <button className={clsx(style['sort__btn'], {
                        [style['sort__btn--active']]: selected[1]
                    })}
                        onClick={() => onClickSortItem('Дешевле')}>Дешевле</button>
                </li>
                <li className={style['sort__item']}>
                    <button className={clsx(style['sort__btn'], {
                        [style['sort__btn--active']]: selected[2]
                    })}
                        onClick={() => onClickSortItem('Дороже')}>Дороже</button>
                </li>
                <li className={style['sort__item']}>

                    <button className={clsx(style['sort__btn'], {
                        [style['sort__btn--active']]: selected[3]
                    })}
                        onClick={() => onClickSortItem('По алфавиту')}>По алфавиту</button>
                </li>
            </ul>
        </div>
    );
}

export default Sort;
import { FC } from 'react';
import BoldArrowIcon from '../../Icons/BoldArrowIcon';
import clsx from 'clsx';
import style from './Pagination.module.scss';

type PaginationProps = {
    prev: () => void;
    next: () => void;
    setPugPosition: (x: number) => void;
    pageCount: number;
}

const Pagination: FC<PaginationProps> = ({ prev, next, setPugPosition, pageCount }) => {
    return (
        <ul className={style['pagination']}>
            <button
                className={clsx(style['pagination-item'], style['pagination-item--prev'])}
                onClick={prev}>
                <BoldArrowIcon />
            </button>
            {
                [...new Array(pageCount)].map((_, i) => (
                    <button
                        className={style['pagination-item']}
                        onClick={() => setPugPosition(i + 1)}
                        key={i}>{i + 1}</button>
                ))
            }
            <button
                className={clsx(style['pagination-item'], style['pagination-item--next'])}
                onClick={next}>
                <BoldArrowIcon />
            </button>
        </ul>
    );
}

export default Pagination;
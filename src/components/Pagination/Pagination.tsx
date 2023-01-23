import { FC } from 'react';
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
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M19 12H5' stroke='#454950' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                    <path d='M12 5L5 12L12 19' stroke='#454950' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                </svg>
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
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M5 12H19' stroke='#454950' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                    <path d='M12 5L19 12L12 19' stroke='#454950' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                </svg>
            </button>
        </ul>
    );
}

export default Pagination;
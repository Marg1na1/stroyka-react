import { FC } from 'react';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import Skeleton from '../Skeletons/Skeleton';
import { useSort } from '../../hooks/useSort';
import { ProductModel } from '../../@types/models';
import { usePagination } from '../../hooks/usePagination';
import clsx from 'clsx';
import style from './CategoryMain.module.scss';

type CategoryMainProps = {
    data: ProductModel[];
    status: boolean;
}

const CategoryMain: FC<CategoryMainProps> = ({ data, status }) => {

    const { sortState, selectSort } = useSort();

    const { pageCount, currentItems, next, prev, setPugPosition } = usePagination({ data });

    const renderCards = currentItems.map((obj) => <Card {...obj} key={obj.fixId} />);
    const renderSkeleton = [...new Array(9)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className={style['category-main']}>
            <ul className={style['sort-list']}>
                <li className={style['sort-list__item']}>
                    <button className={sortState.popular
                        ? clsx(style['sort-list__btn--active'], style['sort-list__btn'])
                        : style['sort-list__btn']}
                        onClick={() => selectSort('popular')}>Популярные</button>
                </li>
                <li className={style['sort-list__item']}>
                    <button className={sortState.cheaper
                        ? clsx(style['sort-list__btn--active'], style['sort-list__btn'])
                        : style['sort-list__btn']}
                        onClick={() => selectSort('cheaper')}>Дешевле</button>
                </li>
                <li className={style['sort-list__item']}>
                    <button className={sortState.expensive
                        ? clsx(style['sort-list__btn--active'], style['sort-list__btn'])
                        : style['sort-list__btn']}
                        onClick={() => selectSort('expensive')}>Дороже</button>
                </li>
                <li className={style['sort-list__item']}>
                    <button className={sortState.alphabet
                        ? clsx(style['sort-list__btn--active'], style['sort-list__btn'])
                        : style['sort-list__btn']}
                        onClick={() => selectSort('alphabet')}>По алфавиту</button>
                </li>
            </ul>
            <ul className={style['category-list']}>
                {status ? renderCards : renderSkeleton}
            </ul>
            {
                data.length > 17 && <Pagination
                    pageCount={pageCount}
                    next={next}
                    prev={prev}
                    setPugPosition={setPugPosition} />
            }
        </div >
    );
}

export default CategoryMain;
import { FC } from 'react';
import { ProductModel } from '../../@types/models';
import Sort from '../Sort/Sort';
import { useSort } from '../../hooks/useSort';
import Card from '../Card/Card';
import Skeleton from '../Skeletons/Skeleton';
import style from './SearchedMain.module.scss';
import { usePagination } from '../../hooks/usePagination';
import Pagination from '../Pagination/Pagination';

type TSearchedMain = {
    data: ProductModel[];
    isLoading: boolean;
}

const SearchedMain: FC<TSearchedMain> = ({ data, isLoading }) => {

    // const { sortState } = useSort();

    const { pageCount, currentItems, next, prev, setPugPosition } = usePagination(data);

    const renderCards = currentItems.map((obj) => <Card {...obj} key={obj.id} />);
    const renderSkeleton = [...new Array(9)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className={style['searched-main']}>
            <Sort />
            <ul className={style['grid']}>
                {isLoading ? renderSkeleton : renderCards}
            </ul>
            {
                (!isLoading && data.length > 17) && <Pagination
                    pageCount={pageCount}
                    next={next}
                    prev={prev}
                    setPugPosition={setPugPosition} />
            }
        </div>
    );
}

export default SearchedMain;
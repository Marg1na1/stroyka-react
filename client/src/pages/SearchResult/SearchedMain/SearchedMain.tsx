import { FC } from 'react';
import { ProductModel } from '../../../@types/models';
import Card from '../../../components/Card/Card';
import Skeleton from '../../../components/Skeletons/Skeleton';
import Pagination from '../../../components/ui/Pagination/Pagination';
import Sort from '../../../components/ui/Sort/Sort';
import { usePagination } from '../../../hooks/usePagination';
import style from './SearchedMain.module.scss';

type TSearchedMain = {
    data: ProductModel[];
    isLoading: boolean;
}

const SearchedMain: FC<TSearchedMain> = ({ data, isLoading }) => {

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
import { FC } from 'react';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import Skeleton from '../Skeletons/Skeleton';
import { useSort } from '../../hooks/useSort';
import { ProductModel } from '../../@types/models';
import { usePagination } from '../../hooks/usePagination';
import style from './CategoryMain.module.scss';
import Sort from '../Sort/Sort';

type CategoryMainProps = {
    data: ProductModel[];
    isLoading: boolean;
}

const CategoryMain: FC<CategoryMainProps> = ({ data, isLoading }) => {

    // const { sortState} = useSort();

    const { pageCount, currentItems, next, prev, setPugPosition } = usePagination(data);

    const renderCards = currentItems.map((obj) => <Card {...obj} key={obj.fixId} />);
    const renderSkeleton = [...new Array(9)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className={style['category-main']}>
            <Sort />
            <ul className={style['category-list']}>
                {isLoading ? renderSkeleton : renderCards}
            </ul>
            {
                (!isLoading && data.length) > 17 && <Pagination
                    pageCount={pageCount}
                    next={next}
                    prev={prev}
                    setPugPosition={setPugPosition} />
            }
        </div>
    );
}

export default CategoryMain; 
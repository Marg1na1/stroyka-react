import { FC } from 'react';
import Card from '../../../components/Card/Card';
import Pagination from '../../../components/ui/Pagination/Pagination';
import Sort from '../../../components/ui/Sort/Sort';
import Skeleton from '../../../components/Skeletons/Skeleton';
import { ProductModel } from '../../../@types/models';
import { usePagination } from '../../../hooks/usePagination';
import style from './CategoryMain.module.scss';

type CategoryMainProps = {
    data: ProductModel[];
    isLoading: boolean;
}

const CategoryMain: FC<CategoryMainProps> = ({ data, isLoading }) => {

    const { pageCount, currentItems, next, prev, setPugPosition } = usePagination(data);

    const renderCards = currentItems.map((obj) => <Card {...obj} key={obj.id} />);
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
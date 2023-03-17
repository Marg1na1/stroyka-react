import { FC } from 'react';
import { ProductModel } from 'types/models';
import { usePagination } from 'hooks/usePagination';
import { Card } from 'components/Card';
import { Skeleton } from 'skeletons';
import { Sort } from 'components/Sort';
import { Pagination } from 'components/Pagination';
import style from './CategoryMain.module.scss';

type Props = {
    data: ProductModel[];
    isLoading: boolean;
}

const CategoryMain: FC<Props> = ({ data, isLoading }) => {

    const { pageCount, currentItems, next, prev, setPugPosition } = usePagination(data);

    const renderCards = currentItems.map(obj => <Card {...obj} key={obj.id} />);
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
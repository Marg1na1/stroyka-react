import { FC } from 'react';
import { ProductModel } from 'types/models';
import { Card } from 'components/Card';
import { Skeleton } from 'skeletons';
import { Pagination } from 'components/Pagination';
import { Sort } from 'components/Sort';
import { usePagination } from 'hooks/usePagination';
import style from './SearchedMain.module.scss';

type Props = {
    data: ProductModel[];
    isLoading: boolean;
}

const SearchedMain: FC<Props> = ({ data, isLoading }) => {

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
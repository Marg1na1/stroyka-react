import { FC } from 'react';
import CategorySide from '../../components/CategorySide/CategorySide';
import EmptyPage from '../EmptyPage/EmptyPage';
import SideSkeleton from '../../components/Skeletons/SideSkeleton';
import Pagination from '../../components/Pagination/Pagination';
import { cutString } from '../../utils/cutString';
import { usePagination } from '../../hooks/usePagination';
import { useLocation } from 'react-router-dom';
import { useGetSearchedQuery } from '../../redux/injected/injectedSearched';
import style from './SearchResult.module.scss';
import SearchedMain from '../../components/SearchedMain/SearchedMain';

const SearchResult: FC = () => {

    const location = useLocation();

    const searchQuery = decodeURI(location.search.split('').slice(3, location.search.split('').length + 1).join(''))

    const { data = [], isLoading, isSuccess, isError } = useGetSearchedQuery({ value: searchQuery, count: 12 });

    const { pageCount, currentItems, next, prev, setPugPosition } = usePagination({ data });

    const emptySearchData = {
        title: 'Упс!',
        subtitle: 'Ничего не найденно',
        descr: `По запросу «${cutString(searchQuery, 50)}» ничего не найденно попробуйте ввести запрос заново`,
        link_txt: 'На главную',
        path: '/'
    }

    if (isError) {
        return <>error</>
    } else if (isLoading) {
        return <div className='container'>
            <h1 className={style['title']}>Товары по запросу «{searchQuery}»</h1>
            <div className={style['wrapper']}>
                <SideSkeleton />
                <SearchedMain items={currentItems} isLoading={isLoading} />
            </div>
        </div>
    } else if (isSuccess && data.length <= 0) {
        return <EmptyPage {...emptySearchData} />
    }

    return (
        <section className={style['search-result']}>
            <div className='container'>
                <h1 className={style['title']}>Товары по запросу «{searchQuery}»</h1>
                <div className={style['wrapper']}>
                    <CategorySide data={data} withSearch={false} />
                    <SearchedMain items={currentItems} isLoading={isLoading} />
                    {
                        (isSuccess && data.length > 17) && <Pagination
                            pageCount={pageCount}
                            next={next}
                            prev={prev}
                            setPugPosition={setPugPosition} />
                    }
                </div>
            </div>
        </section>
    );
}

export default SearchResult;
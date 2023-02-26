import { FC } from 'react';
import SideFilter from '../../components/ui/SideFilter/SideFilter';
import EmptyPage from '../EmptyPage/EmptyPage';
import SideSkeleton from '../../components/Skeletons/SideSkeleton';
import { cutString } from '../../utils/cutString';
import SearchedMain from './SearchedMain/SearchedMain';
import MobileSideWrapper from '../../components/ui/SideFilter/MobileSideWrapper/MobileSideWrapper';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useSort } from '../../hooks/useSort';
import { useLocation } from 'react-router-dom';
import { useGetSearchedQuery } from '../../redux/injected/injectedSearched';
import style from './SearchResult.module.scss';

const SearchResult: FC = () => {

    useScrollToTop();

    const location = useLocation();

    const searchQuery = decodeURI(location.search.split('').slice(3, location.search.split('').length + 1).join(''))

    const { sortState } = useSort();

    const { data = [], isLoading, isSuccess, isError, error } = useGetSearchedQuery(
        {
            value: searchQuery,
            sort: sortState.title
        }
    );

    const errorData = useErrorHandler({ error, isError });

    const emptySearchData = {
        title: 'Упс!',
        subtitle: 'Ничего не найденно',
        descr: `По запросу «${cutString(searchQuery, 50)}» ничего не найденно попробуйте ввести запрос заново`,
        link_txt: 'На главную',
        path: '/'
    }

    const errorObj = {
        title: errorData.status,
        subtitle: 'Произошла ошибка',
        descr: `Произошла ошибка при попытке поиска товаров попробуйте перезагрузить страницу или зайдите позже`,
        link_txt: 'На главную',
        path: '/'
    }

    if (isLoading) {
        return (
            <section className={style['search-result']}>
                <div className='container'>
                    <h1 className={style['title']}>Товары по запросу&nbsp; <div className={style['title-query']}>«<p className={style['title-query__item']}>{searchQuery}</p>»</div></h1>
                    <div className={style['wrapper']}>
                        {<SideSkeleton />}
                        <SearchedMain data={data} isLoading={isLoading} />
                    </div>
                </div>
            </section>
        );
    } else if (isError) {
        return <EmptyPage {...errorObj} />
    } else if (isSuccess && !data.length) {
        return <EmptyPage {...emptySearchData} />
    } else {
        return (
            <section className={style['search-result']}>
                <div className='container'>
                    <h1 className={style['title']}>Товары по запросу&nbsp; <div className={style['title-query']}>«<p className={style['title-query__item']}>{searchQuery}</p>»</div></h1>
                    <div className={style['wrapper']}>
                        <MobileSideWrapper><SideFilter data={data} withSearch={false} /></MobileSideWrapper>
                        <SearchedMain data={data} isLoading={isLoading} />
                    </div>
                </div>
            </section>
        );
    }
}

export default SearchResult;
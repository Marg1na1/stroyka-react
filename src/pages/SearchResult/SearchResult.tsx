import { FC } from 'react';
import style from './SearchResult.module.scss';
import { useLocation } from 'react-router-dom';
import { useGetSearchedQuery } from '../../redux/injected/injectedSearched';
import Card from '../../components/Card/Card';
import { useSort } from '../../hooks/useSort';
import clsx from 'clsx';
import CategorySide from '../../components/CategorySide/CategorySide';
import EmptyPage from '../EmptyPage/EmptyPage';
import Skeleton from '../../components/Skeletons/Skeleton';
import SideSkeleton from '../../components/Skeletons/SideSkeleton';
import { cutString } from '../../utils/cutString';

const SearchResult: FC = () => {

    const location = useLocation();

    const searchQuery = decodeURI(location.search.split('').slice(3, location.search.split('').length + 1).join(''))

    const { data = [], isLoading, isSuccess } = useGetSearchedQuery({ value: searchQuery, count: 12 });

    const { sortState, selectSort } = useSort();

    const emptySearchData = {
        title: 'Упс!',
        subtitle: 'Ничего не найденно',
        descr: `По запросу «${cutString(searchQuery, 50)}» ничего не найденно попробуйте ввести запрос заново`,
        link_txt: 'На главную',
        path: '/'
    }

    const renderCards = data.map((obj) => (<Card {...obj} key={obj.fixId} />));
    const renderSkeleton = [...new Array(9)].map((_, index) => <Skeleton key={index} />);

    return (
        <section className={style['search-result']}>
            {
                (isSuccess && data.length <= 0) ?
                    <EmptyPage {...emptySearchData} /> :
                    <div className="container">
                        <h1 className={style['title']}>Товары по запросу «{searchQuery}»</h1>
                        <div className={style['wrapper']}>
                            {isLoading ? <SideSkeleton /> : <CategorySide data={data} withSearch={false} />}
                            <div className={style['main']}>
                                <ul className={style['filter']}>
                                    <li className={style['filter__item']}>
                                        <button className={sortState.popular === true
                                            ? clsx(style['filter__btn--active'], style['filter__btn'])
                                            : style['filter__btn']}
                                            onClick={() => selectSort('popular')} >Популярные</button>
                                    </li>
                                    <li className={style['filter__item']}>
                                        <button className={sortState.cheaper === true
                                            ? clsx(style['filter__btn--active'], style['filter__btn'])
                                            : style['filter__btn']}
                                            onClick={() => selectSort('cheaper')}>Дешевле</button>
                                    </li>
                                    <li className={style['filter__item']}>
                                        <button className={sortState.expensive === true
                                            ? clsx(style['filter__btn--active'], style['filter__btn'])
                                            : style['filter__btn']}
                                            onClick={() => selectSort('expensive')}>Дороже</button>
                                    </li>
                                    <li className={style['filter__item']}>
                                        <button className={sortState.alphabet === true
                                            ? clsx(style['filter__btn--active'], style['filter__btn'])
                                            : style['filter__btn']}
                                            onClick={() => selectSort('alphabet')}>По алфавиту</button>
                                    </li>
                                </ul>
                                <ul className={style['grid']}>
                                    {
                                        isLoading ? renderSkeleton : renderCards
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
            }

        </section>
    );
}

export default SearchResult;
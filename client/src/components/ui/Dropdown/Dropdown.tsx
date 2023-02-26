import { FC } from 'react';
import { ProductModel } from '../../../@types/models';
import SearchedCard from '../../../pages/SearchResult/SearchedCard/SearchedCard';
import SearchSkeletonCard from '../../Skeletons/SearchSkeletonCard';
import style from './Dropdown.module.scss';

type DropdownProps = {
    data: ProductModel[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    setValue: (x: string) => void;
    searchValue: string;
}

const Dropdown: FC<DropdownProps> = ({ data, isLoading, isSuccess, isError, setValue, searchValue }) => {

    const renderCard = data.map((obj) => (<SearchedCard {...obj} key={obj.id} />));
    const renderSkeleton = [...new Array(4)].map((_, index) => <SearchSkeletonCard key={index} />);

    const history = localStorage.getItem('hist');

    return (
        <div className={style['dropdown']}>
            <div className={style['history']}>
                <h2 className={style['history-title']}>История поиска</h2>
                <ul className={style['history-list']}>
                    {
                        (history !== null && Array.isArray(JSON.parse(history))) &&
                        JSON.parse(history)
                            .map((str: string, i: number) => <li
                                className={style['history__item']}
                                key={i}
                                onClick={() => setValue(str)}>
                                {str.charAt(0).toUpperCase() + str.slice(1)}</li>
                            )
                    }
                </ul>
            </div>
            {
                isError ? <div className={style['notfound']}>
                    <h3 className={style['notfound__title']}>Не удалось получить данные с сервера</h3>
                </div> : (isSuccess && !data.length) ?
                    <div className={style['notfound']}>
                        <h3 className={style['notfound__title']}>По запросу <div className={style['notfound-history']}>«<p className={style['notfound-history__item']}>{searchValue}</p>»</div> ничего не найденно попробуйте ввести запрос заново</h3>
                    </div>
                    : <ul className={style['searched-list']}>
                        {isLoading ? renderSkeleton : renderCard}
                    </ul>

            }
        </div>
    );
}

export default Dropdown;
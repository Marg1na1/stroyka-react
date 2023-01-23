import { FC } from 'react';
import SearchedCard from '../SearchedCard/SearchedCard';
import SearchSkeletonCard from '../Skeletons/SearchSkeletonCard';
import { ProductModel } from '../../@types/models';
import { cutString } from '../../utils/cutString';
import style from './Dropdown.module.scss';

type DropdownProps = {
    data: ProductModel[];
    isLoading: boolean;
    isSuccess: boolean;
    setValue: (x: string) => void;
    searchValue: string;
}

const Dropdown: FC<DropdownProps> = ({ data, isLoading, isSuccess, setValue, searchValue }) => {

    const renderCard = data.map((obj) => (<SearchedCard {...obj} key={obj.fixId} />));
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
                                {cutString(str, 12).charAt(0).toUpperCase() + cutString(str, 12).slice(1)}</li>
                            )
                    }
                </ul>
            </div>
            {
                (isSuccess && data.length === 0) ?
                    <div className={style['notfound']}>
                        <h3 className={style['notfound__title']}>По запросу «{cutString(searchValue, 36)}» ничего не найденно попробуйте ввести запрос заново</h3>
                    </div>
                    : <ul className={style['searched-list']}>
                        {
                            isLoading ? renderSkeleton : renderCard
                        }
                    </ul>
            }
        </div>
    );
}

export default Dropdown;
import { FC, useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import { useDebounce } from '../../hooks/useDebounce';
import { useGetSearchedQuery } from '../../redux/injected/injectedSearched';
import style from './HeaderSearch.module.scss';
import SearchedCard from '../SearchedCard/SearchedCard';

const search_icon = './../assets/images/search_icon.svg';

type SearchProps = {
    isSticky: boolean
}

const HeaderSearch: FC<SearchProps> = ({ isSticky }) => {

    const [searchValue, setSearchValue] = useState<string>('');
    const [dropdown, setDropdown] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const debounced = useDebounce(searchValue, 300);

    const { data = [], isSuccess } = useGetSearchedQuery({ value: debounced, count: 4 }, {
        skip: debounced.length < 3
    });

    useEffect(() => {
        if (inputRef.current !== null) {
            inputRef.current.onfocus = () => setDropdown(true)
            inputRef.current.onblur = () => setDropdown(false)
        }
    }, [debounced])

    return (
        <form className={style['form']}>
            <input
                className={style['form__input']}
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                ref={inputRef} />
            <button className={style['form__btn']}>
                <img src={search_icon} alt={'search'} />
            </button>
            {
                dropdown === true && <ul className={isSticky !== true ? style['searched-list'] : clsx(style['searched-list'], style['searched-list--sticky'])}>
                    {
                        data.map((obj, i) => (
                            <SearchedCard {...obj} key={obj.fixId} />
                        ))
                    }
                </ul>
            }

        </form>
    );
}

export default HeaderSearch;
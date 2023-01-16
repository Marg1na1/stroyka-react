import { FC, useRef, useState, KeyboardEvent } from 'react';
import clsx from 'clsx';
import { useDebounce } from '../../hooks/useDebounce';
import { useGetSearchedQuery } from '../../redux/injected/injectedSearched';
import style from './HeaderSearch.module.scss';
import SearchedCard from '../SearchedCard/SearchedCard';
import { useCloseHandler } from '../../hooks/useCloseHandler';
import { useNavigate } from "react-router-dom";

const search_icon = './../assets/images/search_icon.svg';

type SearchProps = {
    isSticky: boolean
}

const HeaderSearch: FC<SearchProps> = ({ isSticky }) => {

    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState<string>('');
    const [dropdown, setDropdown] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const formRef = useRef<HTMLFormElement>(null);

    const debounced = useDebounce(searchValue, 300);

    const { data = [] } = useGetSearchedQuery({ value: debounced, count: 4 }, {
        skip: debounced.length < 3
    });

    useCloseHandler(debounced, setDropdown, formRef);

    const redirect = (e: KeyboardEvent<HTMLInputElement>) => {
        if (isFocused === true && e.key === 'Enter') {
            e.preventDefault()
            navigate(`/catalog/search?q=${debounced}`)
            setSearchValue('')
        }
    };

    return (
        <form className={style['form']} ref={formRef}>
            <input
                className={style['form__input']}
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={(e) => redirect(e)}
            />
            <button className={style['form__btn']}>
                <img src={search_icon} alt={'search'} />
            </button>
            {
                dropdown === true && <ul className={isSticky !== true ? style['searched-list'] : clsx(style['searched-list'], style['searched-list--sticky'])}>
                    {
                        data.map((obj) => (
                            <SearchedCard {...obj} key={obj.fixId} />
                        ))
                    }
                </ul>
            }
        </form>
    );
}

export default HeaderSearch;
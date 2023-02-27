import { FC, useRef, useState } from 'react';
import { useCloseHandler } from '../../../hooks/useCloseHandler';
import { useDebounce } from '../../../hooks/useDebounce';
import { useSearch } from '../../../hooks/useSearch';
import { SearchIcon } from '../../../Icons/SearchIcon';
import { Dropdown } from '../../ui/Dropdown';
import { useGetSearchedQuery } from '../../../redux/injected/injectedSearched';
import style from './HeaderSearch.module.scss';

const HeaderSearch: FC = () => {

    const [searchValue, setSearchValue] = useState<string>('');
    const [dropdown, setDropdown] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const formRef = useRef<HTMLFormElement>(null);

    const debounced = useDebounce(searchValue, 300);

    const { data = [], isLoading, isSuccess, isError } = useGetSearchedQuery({ value: debounced, count: 4 }, {
        skip: debounced.length < 3
    });

    useCloseHandler(debounced, dropdown, setDropdown, formRef);

    const { redirect, onClickSearchBtn, onClickHistoryItem } = useSearch({
        isFocused,
        debounced,
        searchValue,
        setSearchValue,
        setDropdown,
        formRef
    });

    return (
        <form className={style['form']} ref={formRef}>
            <input
                className={style['form__input']}
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={(e) => redirect(e)}
                onClick={() => setDropdown(true)}
            />
            <button
                className={style['form__btn']}
                onClick={onClickSearchBtn}
                type='button'>
                <SearchIcon />
            </button>
            {
                dropdown && <Dropdown
                    data={data}
                    isLoading={isLoading}
                    isSuccess={isSuccess}
                    isError={isError}
                    setValue={onClickHistoryItem}
                    searchValue={debounced} />
            }
        </form >
    );
}

export default HeaderSearch;
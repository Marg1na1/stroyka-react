import { FC, useRef, useState, KeyboardEvent } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import { useDebounce } from '../../hooks/useDebounce';
import { useCloseHandler } from '../../hooks/useCloseHandler';
import { useNavigate } from "react-router-dom";
import { useGetSearchedQuery } from '../../redux/injected/injectedSearched';
import style from './HeaderSearch.module.scss';

const search_icon = './../assets/images/search_icon.svg';

const HeaderSearch: FC = () => {

    const formRef = useRef<HTMLFormElement>(null);

    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState<string>('');
    const [dropdown, setDropdown] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const debounced = useDebounce(searchValue, 300);

    const { data = [], isLoading, isSuccess } = useGetSearchedQuery({ value: debounced, count: 4 }, {
        skip: debounced.length < 3
    });

    const history = localStorage.getItem('hist'); 

    useCloseHandler(debounced, setDropdown, formRef);

    const redirect = (e: KeyboardEvent<HTMLInputElement>) => {
        if (isFocused === true && e.key === 'Enter') {
            e.preventDefault()
            navigate(`/catalog/search?q=${debounced}`)
            setSearchValue('')
            if (history !== null && JSON.parse(history).length < 10) {
                localStorage.setItem('hist', JSON.stringify(Array.from(new Set([searchValue, ...JSON.parse(history)]))))
            } else if (history === null || !Array.isArray(JSON.parse(history))) {
                localStorage.setItem('hist', JSON.stringify([searchValue]))
            } else {
                localStorage.setItem('hist', JSON.stringify(Array.from(new Set([searchValue, ...JSON.parse(history).splice(0, 9)]))))
            }
        }
    }

    const onClickSearchBtn = () => {
        navigate(`/catalog/search?q=${debounced}`)
        setSearchValue('')
        if (history !== null && JSON.parse(history).length < 10) {
            localStorage.setItem('hist', JSON.stringify(Array.from(new Set([searchValue, ...JSON.parse(history)]))))
        } else if (history === null || !Array.isArray(JSON.parse(history))) {
            localStorage.setItem('hist', JSON.stringify([searchValue]))
        } else {
            localStorage.setItem('hist', JSON.stringify(Array.from(new Set([searchValue, ...JSON.parse(history).splice(0, 9)]))))
        }
    }

    const onClickHistoryItem = (str: string) => {
        setSearchValue(str)
        if (formRef.current !== null) {
            const input = formRef.current.children[0] as HTMLInputElement
            input.focus()
        }
    }

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
            <button
                className={style['form__btn']}
                onClick={onClickSearchBtn}
                type='button'>
                <img src={search_icon} alt='search' />
            </button>
            {
                dropdown === true && <Dropdown
                    data={data}
                    isLoading={isLoading}
                    isSuccess={isSuccess}
                    setValue={onClickHistoryItem}
                    searchValue={debounced} />
            }
        </form >
    );
}

export default HeaderSearch;
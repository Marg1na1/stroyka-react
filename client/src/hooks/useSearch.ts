import { useEffect, RefObject, KeyboardEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
    isFocused: boolean;
    debounced: string;
    searchValue: string;
    setSearchValue: (x: string) => void;
    setDropdown: (x: boolean) => void;
    formRef: RefObject<HTMLFormElement>;
}

export const useSearch = (
    {
        isFocused,
        debounced,
        searchValue,
        setSearchValue,
        setDropdown,
        formRef
    }: Props) => {

    const navigate = useNavigate();

    const { pathname } = useLocation();

    useEffect(() => {
        setDropdown(false)
    }, [pathname]);

    const history = localStorage.getItem('hist');

    const workWithHistory = () => {
        if (history !== null && JSON.parse(history).length < 10) {
            localStorage.setItem('hist', JSON.stringify(Array.from(new Set([searchValue, ...JSON.parse(history)]))))
        } else if (history === null || !Array.isArray(JSON.parse(history))) {
            localStorage.setItem('hist', JSON.stringify([searchValue]))
        } else {
            localStorage.setItem('hist', JSON.stringify(Array.from(new Set([searchValue, ...JSON.parse(history).splice(0, 9)]))))
        }
    }

    const redirect = (e: KeyboardEvent<HTMLInputElement>) => {
        if (isFocused === true && e.key === 'Enter') {
            e.preventDefault()
            navigate(`/catalog/search?q=${debounced}`)
            setSearchValue('')
            setDropdown(false)
            workWithHistory()
            if (formRef.current !== null) {
                const input = formRef.current.children[0] as HTMLInputElement
                input.blur()
            }
        }
    }

    const onClickSearchBtn = () => {
        navigate(`/catalog/search?q=${debounced}`)
        setSearchValue('')
        workWithHistory()
        if (formRef.current !== null) {
            const input = formRef.current.children[0] as HTMLInputElement
            input.blur()
        }
        setDropdown(false)
    }

    const onClickHistoryItem = (str: string) => {
        setSearchValue(str)
        if (formRef.current !== null) {
            const input = formRef.current.children[0] as HTMLInputElement
            input.focus()
        }
    }

    return { redirect, onClickSearchBtn, onClickHistoryItem }
}
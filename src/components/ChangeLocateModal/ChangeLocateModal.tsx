import { FC, useEffect, useRef, useState } from 'react';
import { cities } from '../../data/cities.data';
import { useControlPopup } from '../../hooks/useControlPopup';
import { setLocality } from '../../redux/slices/locateSlice';
import { useAppDispatch } from '../../redux/store';
import style from './ChangeLocateModal.module.scss';

type TChangeLocate = {
    setChangeLocate: (x: boolean) => void;
    changeLocate: boolean;
}

const ChangeLocateModal: FC<TChangeLocate> = ({ setChangeLocate, changeLocate }) => {


    const [searchValue, setSearchValue] = useState('');
    const wrapper = useRef<HTMLDivElement | null>(null);
    const input = useRef<HTMLInputElement | null>(null);
    const dispatch = useAppDispatch();

    useControlPopup(changeLocate, setChangeLocate, wrapper);

    useEffect(() => {
        if (input.current !== null) {
            input.current.focus()
        }
    }, []);

    const reassingLocate = (str: string) => {
        dispatch(setLocality(str))
        sessionStorage.setItem('location', str)
    }
    console.log(input.current)

    return (
        <div className={style['change-locate__wrapper']} ref={wrapper}>
            <div className={style['change-locate']}>
                <h1 className={style['change-locate-title']}>Выберете ваш город</h1>
                <form className={style['change-locate-form']}>
                    <input type="text" className={style['change-locate-input']} ref={input}
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}
                    />
                    <button className={style['change-locate-form__btn']}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#5D6066" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21 21L16.65 16.65" stroke="#5D6066" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </form>
                <ul className={style['change-locate-list']}>
                    {
                        cities
                            .filter((str) => str.toLowerCase().includes(searchValue.toLowerCase()))
                            .map((str, i) => (
                                <li
                                    className={style['change-locate-list__item']}
                                    key={i}
                                    onClick={() => reassingLocate(str)}>
                                    <p>{str}</p>
                                </li>
                            ))
                    }

                </ul>
            </div>
            <div className={style['change-locate__container']}>
                <button onClick={() => setChangeLocate(false)} className={style['change-locate__close']}></button>
            </div>
        </div>
    );
}

export default ChangeLocateModal;
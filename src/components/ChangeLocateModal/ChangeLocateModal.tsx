import { FC, useEffect, useRef, useState } from 'react';
import { cities } from '../../data/cities.data';
import { useControlPopup } from '../../hooks/useControlPopup';
import { useSelector } from 'react-redux';
import { setLocality } from '../../redux/slices/locateSlice';
import { setToggleChengeLocate } from '../../redux/slices/popupSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import style from './ChangeLocateModal.module.scss';

const ChangeLocateModal: FC = () => {

    const [searchValue, setSearchValue] = useState('');

    const isOpenLocateModal = useSelector((state: RootState) => state.popupSlice.isOpenChengeLocate);

    const wrapper = useRef<HTMLDivElement>(null);
    const input = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch();

    const { closeModal } = useControlPopup(isOpenLocateModal, setToggleChengeLocate, wrapper);

    useEffect(() => {
        if (input.current !== null) {
            input.current.focus()
        }
    }, []);

    const reassingLocate = (str: string) => {
        dispatch(setLocality(str));
        sessionStorage.setItem('location', str);
        dispatch(setToggleChengeLocate(false))
    }

    return (
        <div className={style['change-locate__wrapper']} ref={wrapper}>
            <div className={style['change-locate']}>
                <h1 className={style['change-locate-title']}>Выберете ваш город</h1>
                <form className={style['change-locate-form']}>
                    <input
                        type='text'
                        className={style['change-locate-input']}
                        ref={input}
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}
                    />
                    <button className={style['change-locate-form__btn']}>
                        <svg fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' width={24} height={24}>
                            <path d='m11 19c4.4183 0 8-3.5817 8-8 0-4.4183-3.5817-8-8-8-4.4183 0-8 3.5817-8 8 0 4.4183 3.5817 8 8 8z' stroke='#5D6066' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' />
                            <path d='m21 21-4.35-4.35' stroke='#5D6066' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' />
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
                <button onClick={closeModal} className={style['change-locate__close']}></button>
            </div>
        </div>
    );
}

export default ChangeLocateModal;
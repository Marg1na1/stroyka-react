import { FC, useState } from 'react';
import { SearchIcon } from '../../../Icons/SearchIcon';
import { cities } from '../../../data/cities.data';
import { setLocality } from '../../../redux/slices/locateSlice';
import { setToggleChengeLocate } from '../../../redux/slices/popupSlice';
import { useAppDispatch } from '../../../redux/store';
import style from './ChangeLocateModal.module.scss';

const ChangeLocateModal: FC = () => {

    const [searchValue, setSearchValue] = useState('');

    const dispatch = useAppDispatch();

    const reassingLocate = (str: string) => {
        dispatch(setLocality(str))
        sessionStorage.setItem('location', str)
        dispatch(setToggleChengeLocate(false))
    }

    const filteredValue = cities.filter((str) => str.toLowerCase().includes(searchValue.toLowerCase()));

    return (
        <div className={style['change-locate']} role='menubar'>
            <h1 className={style['change-locate-title']}>Выберете ваш город</h1>
            <form className={style['change-locate-form']}>
                <input
                    type='text'
                    className={style['change-locate-input']}
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                />
                <button className={style['change-locate-form__btn']}>
                    <SearchIcon />
                </button>
            </form>
            <ul className={style['change-locate-list']}>
                {
                    filteredValue.length ?
                        filteredValue.map((str, i) => (
                            <li
                                className={style['change-locate-list__item']}
                                key={i}
                                onClick={() => reassingLocate(str)}
                                role='menuitem'>
                                <p>{str}</p>
                            </li>
                        )) :
                        <h2 className={style['change-locate__empty']}>Не удалось найти город. Возможно в вашем городе не работает доставка из StroykaStore</h2>
                }
            </ul>
        </div>
    );
}

export default ChangeLocateModal;

import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { useControlPopup } from '../../hooks/useControlPopup';
import { setToggleOpenBurger } from '../../redux/slices/popupSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import clsx from 'clsx';
import style from './Burger.module.scss';

const Burger: FC = memo(() => {

    const dispatch = useAppDispatch();

    const isOpenBurger = useSelector((state: RootState) => state.popupSlice.isOpenBurger);

    const controlBurger = useControlPopup(isOpenBurger, setToggleOpenBurger);

    const onClickBurger = () => {
        dispatch(setToggleOpenBurger(!isOpenBurger))
    }

    return (
        <button className={isOpenBurger ? clsx(style['burger'], style['burger--active']) : style['burger']} onClick={onClickBurger}>
            <span></span>
        </button>
    );
})

export default Burger;
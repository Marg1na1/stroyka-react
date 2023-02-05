import { FC, ReactNode, useState } from 'react';
import MarkIcon from '../../Icons/MarkIcon';
import clsx from 'clsx';
import style from './MobileSideWrapper.module.scss';

type TMobileSideWrapper = {
    children: ReactNode;
}

const MobileSideWrapper: FC<TMobileSideWrapper> = ({ children }) => {

    const [dropdown, setDropdown] = useState(false);

    const toggleDropdown = () => {
        setDropdown(!dropdown)
    }

    return (
        <div className={style['wrapper']}>
            <button
                className={dropdown ? clsx(style['btn'], style['btn--active']) : style['btn']}
                onClick={toggleDropdown}> <MarkIcon /></button>
            <div className={dropdown ? clsx(style['container'], style['container--active']) : style['container']}>
                {children}
            </div>
        </div>
    );
}

export default MobileSideWrapper;
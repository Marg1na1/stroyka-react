import { FC, ReactNode, useState } from 'react';
import MarkIcon from '../../Icons/MarkIcon';
import clsx from 'clsx';
import style from './MobileSideWrapper.module.scss';

const MobileSideWrapper: FC<{ children: ReactNode }> = ({ children }) => {

    const [dropdown, setDropdown] = useState(false);

    const toggleDropdown = () => {
        setDropdown(!dropdown)
    }

    return (
        <div className={style['wrapper']}>
            <button
                className={clsx(style['btn'], {
                    [style['btn--active']]: dropdown
                })}
                onClick={toggleDropdown}> <MarkIcon /></button>
            <div className={clsx(style['container'], {
                [style['container--active']]: dropdown
            })}>
                {children}
            </div>
        </div>
    );
}

export default MobileSideWrapper;
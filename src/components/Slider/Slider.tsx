import React, { FC } from 'react';
import clsx from 'clsx';
import style from './Slider.module.scss';

const Slider: FC = () => {
    return (
        <section className={clsx(style['slider'], 'mb80')}>
            <div className={style['slider-content']}>

            </div>
        </section>
    );
}

export default Slider;
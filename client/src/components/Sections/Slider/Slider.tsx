import { FC, memo } from 'react';
import BoldArrowIcon from '../../../Icons/BoldArrowIcon';
import { sliderData } from '../../../data/slider.data';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import style from './Slider.module.scss';

const Slider: FC = memo(() => {
    return (
        <section className={style['slider']}>
            <Swiper
                className={style['slider']}
                modules={[Navigation]}
                spaceBetween={20}
                loop={true}
                rewind={true}
                slidesPerView={1}
                navigation={{ nextEl: '.slider-next', prevEl: '.slider-prev' }}>
                {
                    sliderData.map((obj, i) => (
                        <SwiperSlide key={i}>
                            <div className={style['slider-slide']}>
                                <div className={clsx(style['slider-content'], style[obj.titleClass])}>
                                    <h1 className={style['slider__title']}>{obj.title}</h1>
                                    <p className={style['slider__descr']}>{obj.descr}</p>
                                    <img src={obj.img} alt='layout' className={style['slider__bkg']} />
                                </div>
                                <button className={style['slider__btn']}>Подробнее</button>
                            </div>
                        </SwiperSlide>
                    ))
                }
                <div className='slider-prev slider-btn-prev' >
                    <BoldArrowIcon />
                </div>
                <div className='slider-next slider-btn-next' >
                    <BoldArrowIcon />
                </div>
            </Swiper>
        </section>
    );
})

export default Slider;
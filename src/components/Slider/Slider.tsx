import { FC } from 'react';
import clsx from 'clsx';
import style from './Slider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper';
import { sliderData } from '../../data/slider.data';

const Slider: FC = () => {
    return (
        <section className={clsx(style['slider'], 'mb80')}>
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
                                </div>
                                <button className={clsx(style['slider__btn'], 'btn-reset')}>Подробнее</button>
                            </div>
                        </SwiperSlide>
                    ))
                }
                <div className='slider-prev slider-btn-prev'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19" stroke="#454950" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 5L19 12L12 19" stroke="#454950" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className='slider-next slider-btn-next'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19" stroke="#454950" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 5L19 12L12 19" stroke="#454950" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </Swiper>
        </section>
    );
}

export default Slider;
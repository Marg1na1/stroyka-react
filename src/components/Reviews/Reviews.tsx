import { FC, memo, useEffect, useState } from 'react';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import ErrorSection from '../ErrorSection/ErrorSection';
import ReviewsSlide from '../ReviewsSlide/ReviewsSlide';
import ReviewSkeleton from '../Skeletons/ReviewSkeleton';
import { useGetReviewsQuery } from '../../redux/injected/injectedReviews';
import { Swiper, SwiperSlide } from 'swiper/react';
import style from './Reviews.module.scss';

const Reviews: FC = memo(() => {

    const [slideCount, setSlideCount] = useState(3);

    useEffect(() => {
        if (window.innerWidth <= 400) {
            setSlideCount(1)
        } else if (window.innerWidth <= 750) {
            setSlideCount(2)
        }
    }, [])

    const { data = [], isLoading, isFetching, isError, error } = useGetReviewsQuery();

    const errorData = useErrorHandler({ error, isError });

    const renderSkeleton = [...new Array(slideCount * 2)].map((_, index) => <SwiperSlide key={index}><ReviewSkeleton /></SwiperSlide>);
    const renderReview = data.map((obj, i) => <SwiperSlide className={style['reviews-slide']} key={i}><ReviewsSlide {...obj} /></SwiperSlide>);

    const errorObj = { 
        errorCode: errorData.status,
        errorMessage: 'Произошла ошибка при получении отзывов попробуйте обновить страницу или зайдите позже'
    }

    return (
        <section className='mb80'>
            <div className='container'>
                <h2 className={style['reviews-title']}>
                    Отзывы
                </h2>
                {
                    isError ? <ErrorSection {...errorObj} /> : <Swiper
                        className={style['reviews-slider']}
                        spaceBetween={20}
                        loop={true}
                        slidesPerView={slideCount}>
                        {(isFetching || isLoading) ? renderSkeleton : renderReview}
                    </Swiper>
                }
            </div>
        </section>
    );
})

export default Reviews;
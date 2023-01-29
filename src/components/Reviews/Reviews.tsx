import { FC, useEffect, useState } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGetReviewsQuery } from '../../redux/injected/injectedReviews';
import ReviewsSlide from '../ReviewsSlide/ReviewsSlide';
import ReviewSkeleton from '../Skeletons/ReviewSkeleton';
import style from './Reviews.module.scss';

const Reviews: FC = () => {

    const [slideCount, setSlideCount] = useState(3);

    useEffect(() => {
        if (window.innerWidth <= 400) {
            setSlideCount(1)
        } else if (window.innerWidth <= 750) {
            setSlideCount(2)
        }
    }, [])

    const { data = [], isLoading } = useGetReviewsQuery();

    const renderSkeleton = [...new Array(slideCount * 2)].map((_, index) => <SwiperSlide key={index}><ReviewSkeleton /></SwiperSlide>);
    const renderReview = data.map((obj, i) => <SwiperSlide className={style['reviews-slide']} key={i}><ReviewsSlide {...obj} /></SwiperSlide>);

    return (
        <section className={style['reviews']}>
            <div className='container'>
                <h2 className={style['reviews-title']}>
                    Отзывы
                </h2>
                <Swiper
                    className={style['reviews-slider']}
                    spaceBetween={20}
                    loop={true}
                    rewind={true}
                    slidesPerView={slideCount}>
                    {
                        isLoading ? renderSkeleton : renderReview
                    }
                </Swiper>
            </div>
        </section>
    );
}

export default Reviews;
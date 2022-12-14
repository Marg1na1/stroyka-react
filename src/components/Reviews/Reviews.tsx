import { FC } from 'react';
import style from './Reviews.module.scss';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGetReviewsQuery } from '../../redux/injected/injectedReviews';
import ReviewsSlide from '../ReviewsSlide/ReviewsSlide';

const Reviews: FC = () => {

    const { data = [] } = useGetReviewsQuery();

    return (
        <section className={style['reviews']}>
            <div className="container">
                <h2 className={style['reviews-title']}>
                    Отзывы
                </h2>
                <Swiper
                    className={style['reviews-slider']}
                    modules={[Navigation]}
                    spaceBetween={20}
                    loop={true}
                    rewind={true}
                    slidesPerView={3}
                    navigation={{ nextEl: 'review-next', prevEl: 'review-prev' }}>
                    {
                        data.map((obj, i) => (
                            <SwiperSlide className={style['reviews-slide']} key={i}>
                                <ReviewsSlide {...obj} />
                            </SwiperSlide>

                        ))
                    }

                </Swiper>
            </div>
        </section>
    );
}

export default Reviews;
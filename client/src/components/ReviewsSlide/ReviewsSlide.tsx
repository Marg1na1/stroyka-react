import { FC } from 'react';
import style from './ReviewsSlide.module.scss';
import { TReviews } from '../../@types/globalTypes';

const ReviewsSlide: FC<TReviews> = ({ avatar, content, name, createdAt }) => {
    return (
        <>
            <div className={style['reviews-slide-header']}>
                <img src={avatar} alt="" />
                <h3 className={style['reviews-slide__name']}>{name}</h3>
            </div>
            <div className={style['reviews-slide-content']}>
                <p>{content}</p>
            </div>
            <div className={style['reviews-slide-date']}>
                <p>{createdAt}</p>
            </div>
        </>
    );
}

export default ReviewsSlide;
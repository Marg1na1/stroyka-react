import { FC } from 'react';
import { TReviews } from '../../@types/globalTypes';
import style from './ReviewsSlide.module.scss';

const ReviewsSlide: FC<TReviews> = ({ avatar, content, name, createdAt }) => {
    return (
        <article>
            <div className={style['reviews-slide-header']}>
                <img src={avatar} alt={'avatar'} />
                <h3 className={style['reviews-slide__name']}>{name}</h3>
            </div>
            <div className={style['reviews-slide-content']}>
                <p>{content}</p>
            </div>
            <div className={style['reviews-slide-date']}>
                <p>{createdAt}</p>
            </div>
        </article>
    );
}

export default ReviewsSlide;
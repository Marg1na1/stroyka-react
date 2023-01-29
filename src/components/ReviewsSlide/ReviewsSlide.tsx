import { FC } from 'react';
import { ReviewModel } from '../../@types/models';
import style from './ReviewsSlide.module.scss';

const ReviewsSlide: FC<ReviewModel> = ({ avatar, content, name, createdAt }) => {
    return (
        <article className={style['reviews-slide__container']}>
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
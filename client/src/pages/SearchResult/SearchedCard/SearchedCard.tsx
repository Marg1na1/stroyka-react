import { FC, memo } from 'react';
import { useAddProduct } from '../../../hooks/useAddProduct';
import { getCurrentPrice } from '../../../utils/getCurrentPrice';
import { Link } from 'react-router-dom';
import style from './SearchedCard.module.scss';

type TSearchedCard = {
    id: string;
    img: string;
    title: string;
    provider: string;
    rating: number;
    price: number;
    type: string;
    discount: string;
    discountAmount?: number;
}

const SearchedCard: FC<TSearchedCard> = memo((
    {
        img,
        title,
        price,
        discount,
        discountAmount,
        id
    }) => {

    const currentPrice: number = getCurrentPrice(price, discountAmount);

    const addProduct = useAddProduct();

    const onClickAddProduct = (id: string, count: number) => {
        addProduct(id, count)
    }

    return (
        <li className={style['card']}>
            <article className={style['card-content']}>
                <Link to={`/products/${id}`}>
                    <img
                        className={style['card__img']}
                        src={img}
                        alt={title}
                        width={121}
                        height={90} />
                </Link>
                <div className={style['card-main']}>
                    <p className={style['card__title']}>{title}</p>
                    <div className={style['card__price']}>
                        <p className={style['card__price--current']}>
                            {discount ? currentPrice : price} ₽
                        </p>
                        {discount && <s className={style['card__price--past']}>{price}</s>}
                    </div>
                    <button className={style['card__btn']} onClick={() => onClickAddProduct(id, 1)} type={'button'}>В корзину</button>
                </div>
                {discount && <span className={style['card__discount']}>-{discountAmount}%</span>}
            </article>
        </li>
    );
})

export default SearchedCard;
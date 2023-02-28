import { FC, memo } from 'react';
import { getCurrentPrice } from 'utils/getCurrentPrice';
import { useAddProduct } from 'hooks/useAddProduct';
import { Link } from 'react-router-dom';
import style from './Card.module.scss';

type Props = {
    id: string;
    img: string;
    title: string;
    provider: string;
    rating: number;
    price: number;
    type: string;
    discount: string;
    discountAmount?: number;
    horizontal?: boolean;
}

const Card: FC<Props> = memo((
    {
        img,
        title,
        price,
        discount,
        horizontal = false,
        discountAmount,
        id,
    }) => {

    const currentPrice: number = getCurrentPrice(price, discountAmount);

    const addProduct = useAddProduct();

    const onClickAddProduct = () => {
        addProduct(id, 1)
    }

    return (
        <li className={style['grid-item']}>
            <article className={horizontal ? style['grid-item__content--h'] : style['grid-item__content']}>
                <Link to={`/products/${id}`}>
                    <img
                        loading='lazy'
                        className={horizontal ? style['grid-item__image--h'] : style['grid-item__image']}
                        src={img}
                        alt={title}
                        width={276}
                        height={207}
                    />
                </Link>
                <div className={style['grid-item__main']}>
                    <Link to={`/products/${id}`}>
                        <h2 className={style['grid-item__title']}>{title}</h2>
                    </Link>
                    <div className={style['grid-item__price']}>
                        <p className={style['grid-item__price--current']}>
                            {discount ? currentPrice : price} ₽
                        </p>
                        {discount && <s className={style['grid-item__price--past']}>{price}</s>}
                    </div>
                    <button
                        className={style['grid-item__btn']}
                        onClick={() => onClickAddProduct()}>В корзину</button>
                </div>
                {discount && <span className={style['grid-item__discount']}>-{discountAmount}%</span>}
            </article>
        </li>
    );
})

export default Card;
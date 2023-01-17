import { FC } from 'react';
import { Link } from 'react-router-dom';
import { TransmittedData } from '../../@types/models';
import { useAddProduct } from '../../hooks/useAddProduct';
import style from './SearchedCard.module.scss';

type TSearchedCard = {
    id: string;
    fixId: number;
    img: string;
    title: string;
    provider: string;
    rating: number;
    price: number;
    type: string;
    discount: string;
    discountAmount?: number;
}

const SearchedCard: FC<TSearchedCard> = ({ img, title, price, discount, discountAmount, fixId, provider }) => {

    const currentPrice: number = Math.round(((price - price / 100 * discountAmount!)));
    const isDiscounted: boolean = discount === 'true';

    const addProduct = useAddProduct();

    const obj: TransmittedData = {
        img,
        title,
        finalPrice: isDiscounted ? currentPrice : price,
        fixId,
        provider,
        count: 1,
        id: 0
    };

    const onClickAddProduct = (obj: TransmittedData) => {
        addProduct(obj)
    }

    return (
        <li className={style['card']}>
            <article className={style['card-content']}>
                <Link to={`/products/${fixId}`}><img className={style['card__img']} src={img} alt='product' /></Link>
                <div className={style['card-main']}>
                    <p className={style['card__title']}>{title}</p>
                    <div className={style['card__price']}>
                        <p className={style['card__price--current']}>
                            {isDiscounted ? currentPrice : price} ₽
                        </p>
                        {
                            isDiscounted && <s className={style['card__price--past']}>{price}</s>
                        }
                    </div>
                    <button className={style['card__btn']} onClick={() => onClickAddProduct(obj)} type={'button'}>В корзину</button>
                </div>
                {
                    isDiscounted && <span className={style['card__discount']}>-{discountAmount}%</span>
                }
            </article>
        </li>
    );
}

export default SearchedCard;
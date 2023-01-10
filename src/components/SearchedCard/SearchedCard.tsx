import { FC } from 'react';
import { TCartCard } from '../../@types/globalTypes';
import { useAddCartItemMutation, useChangeCartItemMutation, useGetCartQuery } from '../../redux/injected/injectedCart';
import style from './SearchedCard.module.scss';

type testType = {
    id: number;
    fixId: number;
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

const SearchedCard: FC<testType> = ({ img, title, price, discount, horizontal = false, discountAmount, fixId, provider }) => {

    const currentVievPrice: number = Math.round(((price - price / 100 * discountAmount!)));
    const truthCheck: boolean = discount === 'true';
    const finalPrice: number = truthCheck ? currentVievPrice : price;

    const obj = { img, title, finalPrice, fixId, provider, count: 0, id: 0 };

    const { data = [] } = useGetCartQuery();

    const [addCartItem] = useAddCartItemMutation();

    const [changeCartItem] = useChangeCartItemMutation();

    const addProduct = async (item: any) => {
        if (data.find((obj: any) => obj.fixId === item.fixId)) {
            const currentCount = data.find((obj: TCartCard) => obj.fixId === item.fixId)
            item.count += currentCount!.count + 1
            item.id = currentCount!.id
            await changeCartItem(item)
        } else {
            item.count += 1
            await addCartItem(item)
        }

    }

    return (
        <li className={style['card']}>
            <article className={style['card-content']}>
                <img className={style['card__img']} src={img} alt='product' />
                <div className={style['card-main']}>
                    <p className={style['card__title']}>{title}</p>
                    <div className={style['card__price']}>
                        <p className={style['card__price--current']}>
                            {truthCheck ? currentVievPrice : price} ₽
                        </p>
                        {
                            truthCheck && <s className={style['card__price--past']}>{price}</s>
                        }
                    </div>
                    <button className={style['card__btn']} onClick={() => addProduct(obj)}>В корзину</button>
                </div>
                {
                    truthCheck && <span className={style['card__discount']}>-{discountAmount}%</span>
                }
            </article>
        </li>
    );
}

export default SearchedCard;
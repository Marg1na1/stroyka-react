import { FC } from 'react';
import { TruckIcon } from '../../../Icons/TruckIcon';
import { ProductModel } from '../../../@types/models';
import { useInputHandler } from '../../../hooks/useInputHandler';
import { useAddProduct } from '../../../hooks/useAddProduct';
import { getCurrentPrice } from '../../../utils/getCurrentPrice';
import clsx from 'clsx';
import style from './ProductCard.module.scss';

const ProductCard: FC<{ data: ProductModel }> = ({ data }) => {

    const currentPrice = getCurrentPrice(data.price, data.discountAmount);

    const { inputHandler, onClickMinus, onClickPlus, productAmount } = useInputHandler({ min: 1, max: 999, defaultCount: 1 });

    const addProduct = useAddProduct();

    const onClickAddProduct = (id: string, count: number) => {
        addProduct(id, count)
    }

    return (
        <div className={style['product-card']}>
            <article className={style['wrapper']}>
                <img
                    className={style['img']}
                    src={data.img}
                    alt={data.title}
                    width={572}
                    height={428} />
                <div className={style['main']}>
                    <h1 className={style['title']}>{data.title}</h1>
                    <div className={style['price']}>
                        <p className={style['price__current']}>
                            {data.discount ? currentPrice : data.price} ₽
                        </p>
                        {data.discount && <s className={style['price__past']}>{data.price}₽</s>}
                    </div>
                    <form className={style['form']}>
                        <button className={style['submit']}
                            type='button'
                            onClick={() => onClickAddProduct(data.id, productAmount)}>В корзину</button>
                        <div className={style['amount']}>
                            <button
                                type='button'
                                className={clsx(style['amount__btn'], style['amount__btn--minus'])}
                                onClick={onClickMinus}></button>
                            <input
                                type='number'
                                className={style['amount__input']}
                                value={productAmount}
                                onChange={(e) => inputHandler(e)} />
                            <button
                                type='button'
                                className={clsx(style['amount__btn'], style['amount__btn--plus'])}
                                onClick={onClickPlus}></button>
                        </div>
                    </form>
                    <div className={style['provider']}>
                        Поставщик:  {data.provider}
                    </div>
                    <div className={style['info']}>
                        <TruckIcon /> <p>Доставка осуществляется курьерами поставщика или службой курьеров Достависта. Также товар можно забрать самостоятельно от&nbsp;поставщика</p>
                    </div>
                </div>
                {data.discount && <span className={style['discount']}>-{data.discountAmount}%</span>}
            </article>
        </div>
    );
}

export default ProductCard;
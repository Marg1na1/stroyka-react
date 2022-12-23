import { FC } from 'react';
import style from './Hero.module.scss';

const Hero: FC = () => {
    return (
        <section className={style['hero']}>
            <div className={style['hero-layout']}>
                <div className={style['hero-content']}>
                    <h2 className={style['hero-title']}>О компании</h2>
                    <p className={style['hero-text']}>В&nbsp;СтройкаСтор вы&nbsp;всегда можете купить все необходимые товары для ремонта дома и&nbsp;дачи. Хотите сделать ремонт в&nbsp;квартире? Строите загородный дом? Используйте строительные и&nbsp;отделочные материалы из&nbsp;нашего каталога.</p>
                    <p className={style['hero-text']}>Быстрая доставка строительных товаров по&nbsp;низким ценам сделает ваши покупки более приятными. Ремонт может стоить дешево, если делать его с&nbsp;нами. Для вас всегда в&nbsp;наличии более 30&nbsp;000 товаров для строительства по&nbsp;низким ценам каждый день.
                        СтройкаСтор&nbsp;&mdash; это широкий ассортимент товаров для дома и&nbsp;ремонта недорого; Возможность заказать строительные и&nbsp;отделочные материалы для дома и&nbsp;дачи.</p>
                </div>
            </div>
        </section>
    );
}

export default Hero;
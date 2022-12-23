import { FC, useState } from 'react';
import style from './Delivery.module.scss';
import Headline from '../../components/Headline/Headline';
import { headData, tutorialArr, FAQData } from '../../data/delivery.data';
import clsx from 'clsx';
import FAQItem from '../../components/FAQItem/FAQItem';

const Delivery: FC = () => {

    const [selected, setSelected] = useState<number | null>(null);

    const openAccord = (i: number) => {
        if (selected === i) {
            setSelected(null)
        } else {
            setSelected(i)
        }
    }

    return (
        <section className={style['delivery']}>
            <Headline {...headData} />
            <div className="container">
                <div className={clsx(style['delivery-tutorial'], 'mb80')}>
                    <h2 className={style['delivery-title']}>Как сделать заказ: 4 простых шага</h2>
                    <ul className={style['delivery-list']}>
                        {
                            tutorialArr.map((obj, i) => (
                                <li className={style['delivery-list__item']} key={i}>
                                    <img src={obj.img} alt="" />
                                    <p>
                                        {obj.content}
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className={clsx(style['faq'],)}>
                    <div className={style['faq-container']}>
                        <h2 className={style['faq-title']}>Часто задаваемые вопросы</h2>
                        <ul className={clsx(style['faq-list'], 'mb80')}>
                            {
                                FAQData.map((obj, i) => (
                                    <FAQItem {...obj} selected={selected} openAccord={openAccord} key={i} />
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );

}

export default Delivery;
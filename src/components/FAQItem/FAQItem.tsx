import { FC, Fragment } from 'react';
import clsx from 'clsx';
import style from './FAQItem.module.scss';

const corner_icon = './../assets/images/corner_icon.svg';

type TFAQItem = {
    question: string;
    answer: {
        text: string;
        text1: string;
    }[];
    id: number;
    selected: number | null;
    openAccord: (x: number) => void
}

const FAQItem: FC<TFAQItem> = ({ question, answer, id, selected, openAccord }) => {

    return (
        <li className={style['faq-item']}>
            <button className={style['faq-btn']} onClick={() => openAccord(id)}>
                {question} <img className={selected === id ? clsx(style['faq-item__corner'], style['faq-item__corner--active']) : style['faq-item__corner']} src={corner_icon} alt='indicator' />
            </button>
            {
                <div className={selected === id ? clsx(style['faq-container'], style['faq-container--active']) : style['faq-container']}>
                    {
                        answer.map((obj, i) => (
                            <Fragment key={i}>
                                <p className={style['faq-answer']}>{obj.text}</p>
                                <p className={style['faq-answer']}>{obj.text1}</p>
                            </Fragment>
                        ))
                    }
                </div>
            }
        </li>
    );
}

export default FAQItem;
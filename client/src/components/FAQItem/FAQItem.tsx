import { FC, Fragment } from 'react';
import { MarkIcon } from 'icons';
import clsx from 'clsx';
import style from './FAQItem.module.scss';

type Props = {
    question: string;
    answer: {
        text: string;
        text1: string;
    }[];
    id: number;
    selected: number | null;
    openAccord: (x: number) => void
}

const FAQItem: FC<Props> = ({ question, answer, id, selected, openAccord }) => {

    return (
        <li className={style['faq-item']}>
            <button className={style['faq-btn']} onClick={() => openAccord(id)}>
                {question}
                <div className={clsx(style['faq-item__corner'], {
                    [style['faq-item__corner--active']]: selected === id
                })}>
                    <MarkIcon />
                </div>
            </button>
            {
                <div className={clsx(style['faq-container'], {
                    [style['faq-container--active']]: selected === id
                })}>
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
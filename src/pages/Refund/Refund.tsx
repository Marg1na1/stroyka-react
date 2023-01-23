import { FC } from 'react';
import Headline from '../../components/Headline/Headline';
import { headData, refundList } from '../../data/refund.data';
import style from './Refund.module.scss';

const Refund: FC = () => {

    return (
        <section className={style['refund']}>
            <Headline {...headData} />
            <div className='container'>
                <ul className={style['refund-list']}>
                    {
                        refundList.map((obj, i) => (
                            <li className={style['refund-item']} key={i}>
                                <h2 className={style['refund-item__title']}>{obj.title}</h2>
                                <div className={style['refund-item__content']}>
                                    {
                                        obj.content.map((text, i) => (
                                            <p className={style['refund-item__text']} key={i}>{text}</p>
                                        ))
                                    }
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    );
}

export default Refund;
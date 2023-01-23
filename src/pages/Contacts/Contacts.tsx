import { FC } from 'react';
import Headline from '../../components/Headline/Headline';
import YMap from '../../components/YMap/YMap';
import Hero from '../../components/Hero/Hero';
import { contactsContent, headData } from '../../data/contacts.data';
import style from './Contacts.module.scss';

const Contacts: FC = () => {

    return (
        <section className={style['contacts']}>
            <Headline {...headData} />
            <div className='container'>
                <YMap />
                <div className={style['contacts-main']}>
                    <h2 className={style['contacts-title']}>ООО «СтройкаСтор»</h2>
                    <div className={style['contacts-content']}>
                        <ul className={style['adress']}>
                            {
                                contactsContent.map((obj, i) => (
                                    obj.type === 'address' &&
                                    <li className={style['contacts-content__item']} key={i}>
                                        <p>{obj.content}</p>
                                    </li>
                                ))
                            }
                        </ul>
                        <ul className={style['requisites']}>
                            {
                                contactsContent.map((obj, i) => (
                                    obj.type === 'requisites' &&
                                    <li className={style['contacts-content__item']} key={i}>
                                        <p>{obj.content}</p>
                                    </li>
                                ))
                            }
                        </ul>
                        <ul className={style['contacts']}>
                            {
                                contactsContent.map((obj, i) => (
                                    obj.type === 'contacts' &&
                                    <li className={style['contacts-content__item']} key={i}>
                                        <p>{obj.content}</p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <Hero />
        </section>
    );
}

export default Contacts;
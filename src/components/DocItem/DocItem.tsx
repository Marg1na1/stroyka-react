import { FC } from 'react';
import { TListItem } from '../../data/documentation.data';
import style from './DocItem.module.scss';


const DocItem: FC<TListItem> = ({ title, token }) => {
    return (
        <li className={style['documentation-item']}>
            <div className={style['documentation-item__header']}>
                <h2 className={style['documentation-item__title']}>{title}</h2>
                <div className={style['documentation-item__text']}>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className={style['documentation-item__main']}>
                <b className={style['documentation-item__subtitle']}>{title}</b>
                <p className={style['documentation-item__size']}>DOCX · 10 МБ</p>
                <a href={`https://drive.google.com/uc?export=download&id=${token}`} download className={style['documentation-item__download']}>Скачать</a>
            </div>
        </li>
    );
}

export default DocItem;
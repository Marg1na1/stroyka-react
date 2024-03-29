import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useScrollToTop } from 'hooks/useScrollToTop';
import style from './EmptyPage.module.scss';

type Props = {
    title?: string | number;
    subtitle?: string;
    descr?: string;
    link_txt?: string;
    path?: string;
}

const EmptyPage: FC<Props> = (
    {
        title = '404',
        subtitle = 'Страница не найдена',
        descr = 'Неправильно набран адрес или такая страница больше не существует',
        link_txt = 'На главную',
        path =  '/'
    }
) => {

    useScrollToTop();

    return (
        <section className={style['empty']}>
            <div className='container'>
                <div className={style['empty-wrapper']}>
                    <div className={style['empty-content']}>
                        <h1 className={style['empty__title']}>{title}</h1>
                        <h2 className={style['empty__subtitle']}>{subtitle}</h2>
                        <p className={style['empty__descr']}>{descr}</p>
                        <Link to={path} className={style['empty__link']}>{link_txt}</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default EmptyPage;
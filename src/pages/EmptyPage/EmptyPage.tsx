import { FC } from 'react';
import { Link } from 'react-router-dom';
import style from './EmptyPage.module.scss';

type EmptyPageProps = {
    title: string;
    subtitle: string;
    descr: string;
    link_txt: string;
    path: string;
}

const EmptyPage: FC<EmptyPageProps> = ({ title, subtitle, descr, link_txt, path }) => {
    return (
        <section className={style['empty']}>
            <div className="container">
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
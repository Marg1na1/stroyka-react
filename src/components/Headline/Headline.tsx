import { FC, memo } from 'react';
import { THeadlineBreadcrumbs } from '../../@types/globalTypes';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import style from './Headline.module.scss';

type HeadlineProps = {
    breadcrumbs: THeadlineBreadcrumbs[];
    title?: string;
    descr?: string;
    layout?: string;
}

const Headline: FC<HeadlineProps> = memo(({ breadcrumbs, title, descr, layout }) => {

    return (
        <section className={clsx(style['headline'], {
            'mb80': !layout
        })}>
            <div className={layout === undefined ? style['headline__empty-layout'] : style['headline-layout']}>
                <div className={layout === undefined ? style['headline__content--static'] : style['headline__content']}>
                    <div className={style['headline-breadcrumbs']}>
                        {
                            breadcrumbs.map((obj, i) => (
                                obj.type === 'link' ? <Link to={obj.path!} key={i}>{obj.title}</Link> : <p key={i}>{obj.title}</p>
                            ))
                        }
                    </div>
                    <h1 className={clsx(style['headline-title'], 'main-title')}>{title}</h1>
                    <p className={style['headline-descr']}>{descr}</p>
                </div>
                {layout && <img
                    className={style['headline-layout__img']}
                    src={layout}
                    alt='layout'
                    width={1360}
                    height={232} />}
            </div>
        </section>
    );
})

export default Headline;
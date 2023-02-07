import { FC } from 'react';
import DocItem from '../../components/DocItem/DocItem';
import Headline from '../../components/Headline/Headline';
import { headData, listItem } from '../../data/documentation.data';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import style from './Documentation.module.scss';

const Documentation: FC = () => {

    useScrollToTop();

    return (
        <section className={style['documentation']}>
            <Headline {...headData} />
            <div className='container'>
                <ul className={style['documentation-list']}>
                    {
                        listItem.map((obj, i) => (
                            <DocItem {...obj} key={i} />
                        ))
                    }
                </ul>
            </div>
        </section>
    );
}

export default Documentation;
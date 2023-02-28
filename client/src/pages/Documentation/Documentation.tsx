import { FC } from 'react';
import { DocItem } from 'components/DocItem';
import { Headline } from 'components/Headline';
import { headData, listItems } from 'data/documentation.data';
import { useScrollToTop } from 'hooks/useScrollToTop';
import style from './Documentation.module.scss';

const Documentation: FC = () => {

    useScrollToTop();

    return (
        <section className={style['documentation']}>
            <Headline {...headData} />
            <div className='container'>
                <ul className={style['documentation-list']}>
                    {
                        listItems.map((obj, i) => (
                            <DocItem {...obj} key={i} />
                        ))
                    }
                </ul>
            </div>
        </section>
    );
}

export default Documentation;
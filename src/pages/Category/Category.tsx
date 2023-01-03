import clsx from 'clsx';
import { FC } from 'react';
import { THeadlineBreadcrumbs } from '../../@types/globalTypes';
import Card from '../../components/Card/Card';
import CategorySide from '../../components/CategorySide/CategorySide';
import Headline from '../../components/Headline/Headline';
import { TCategory } from '../../data/catalog.data';
import { useGetCategoryItemsQuery } from '../../redux/injected/injectedCategory';
import style from './Categoty.module.scss';

type CategoryProps = {
    categoryData: TCategory[]
}

type Tres = {
    title: string;
    path: string;
}


const Category: FC<CategoryProps> = ({ categoryData }) => {

    const name = window.location.pathname.split('/')[3];

    let res: Tres = {
        title: '',
        path: '',
    }
    categoryData.forEach((obj) => obj.list.forEach((obj) => obj.path.split('/')[1] === name ? res = obj : null))

    const breadcrumbsArr: THeadlineBreadcrumbs[] = [
        { path: '/', title: 'Главная', type: 'link' },
        { title: '→', type: 'seperator' },
        { path: '/catalog', title: 'Каталог', type: 'link' },
        { title: '→', type: 'seperator' },
        { path: ' ', title: res.title, type: 'link' },
    ]

    const headData = {
        breadcrumbs: breadcrumbsArr,
        title: res.title,
    }

    const { data = [], isSuccess } = useGetCategoryItemsQuery(res.path.split('/')[1]);


    return (
        <section className={style['category']}>
            <Headline {...headData} />
            <div className={clsx(style['category-container'], 'container')}>
                {isSuccess &&  <CategorySide data={data} />}
                <ul className={style['category-list']}>
                    {
                        isSuccess && data.map((obj, i) => (
                            <Card {...obj} key={i} />
                        ))

                    }
                </ul>
            </div>
        </section>
    );
}

export default Category;


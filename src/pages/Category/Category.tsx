import { FC, useState } from 'react';
import clsx from 'clsx';
import { THeadlineBreadcrumbs } from '../../@types/globalTypes';
import CategorySide from '../../components/CategorySide/CategorySide';
import Headline from '../../components/Headline/Headline';
import { TCategory } from '../../data/catalog.data';
import { useGetCategoryItemsQuery } from '../../redux/injected/injectedCategory';
import style from './Categoty.module.scss';
import CategoryMain from '../../components/CategoryMain/CategoryMain';
import { useLocation } from 'react-router-dom';

type CategoryProps = {
    categoryData: TCategory[]
}

const Category: FC<CategoryProps> = ({ categoryData }) => {

    const [pagination, setPagination] = useState(1);

    const location = useLocation();
    const name = location.pathname.split('/')[3];

    let res = {
        title: '',
        path: '',
    }

    categoryData.forEach((obj) => obj.list.forEach((obj) => obj.path.split('/')[1] === name ? res = obj : null))

    const obj = {
        type: res.path.split('/')[1],
        p: pagination
    };

    const { data = [], isSuccess } = useGetCategoryItemsQuery(obj);

    // const paginationCount = Math.ceil(data.length / 18)

    // console.log(paginationCount)

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

    return (
        <section className={style['category']}>
            <Headline {...headData} />
            <div className={clsx(style['category-container'], 'container')}>
                {isSuccess && <CategorySide data={data} withSearch />}
                {isSuccess && <CategoryMain data={data} />}
            </div>
        </section>
    );
}

export default Category;


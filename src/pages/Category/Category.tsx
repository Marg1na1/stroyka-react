import { FC } from 'react';
import clsx from 'clsx';
import { THeadlineBreadcrumbs } from '../../@types/globalTypes';
import CategorySide from '../../components/CategorySide/CategorySide';
import Headline from '../../components/Headline/Headline';
import { TCategory } from '../../data/catalog.data';
import { useGetCategoryItemsQuery } from '../../redux/injected/injectedCategory';
import style from './Category.module.scss';
import CategoryMain from '../../components/CategoryMain/CategoryMain';
import { useLocation } from 'react-router-dom';
import SideSkeleton from '../../components/Skeletons/SideSkeleton';

type CategoryProps = {
    categoryData: TCategory[]
}

const Category: FC<CategoryProps> = ({ categoryData }) => {

    const location = useLocation();
    const name = location.pathname.split('/')[3];

    let res = {
        title: '',
        path: '',
    }

    categoryData.forEach((obj) => obj.list.forEach((obj) => obj.path.split('/')[1] === name ? res = obj : null))

    const { data = [], isSuccess, isLoading } = useGetCategoryItemsQuery(res.path.split('/')[1]);

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
                {isLoading ? <SideSkeleton /> : <CategorySide data={data} withSearch />}
                {isSuccess && <CategoryMain data={data} status={isSuccess} />}
            </div>
        </section>
    );
}

export default Category;


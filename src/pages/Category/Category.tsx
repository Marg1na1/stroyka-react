import { FC } from 'react';
import SideFilter from '../../components/SideFilter/SideFilter';
import Headline from '../../components/Headline/Headline';
import CategoryMain from '../../components/CategoryMain/CategoryMain';
import SideSkeleton from '../../components/Skeletons/SideSkeleton';
import { THeadlineBreadcrumbs } from '../../@types/globalTypes';
import { TCategory } from '../../data/catalog.data';
import MobileSideWrapper from '../../components/MobileSideWrapper/MobileSideWrapper';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import { useGetCategoryItemsQuery } from '../../redux/injected/injectedCategory';
import style from './Category.module.scss';

const Category: FC<{ categoryData: TCategory[] }> = ({ categoryData }) => {

    useScrollToTop();

    const { type = '' } = useParams();

    let res = {
        title: '',
        path: '',
    }

    categoryData.forEach((obj) => obj.list.forEach(obj => obj.path.split('/')[1] === type ? res = obj : null))

    const { data = [], isSuccess, isLoading } = useGetCategoryItemsQuery(type);

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
                {isLoading ? <SideSkeleton /> : <MobileSideWrapper><SideFilter data={data} withSearch /></MobileSideWrapper>}
                <CategoryMain data={data} status={isSuccess} />
            </div>
        </section>
    );
}

export default Category;


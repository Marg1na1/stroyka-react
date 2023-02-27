import { FC } from 'react';
import { SideFilter } from '../../components/ui/SideFilter';
import { Headline } from '../../components/ui/Headline';
import { CategoryMain } from './CategoryMain';
import { SideSkeleton } from '../../components/Skeletons/SideSkeleton';
import { THeadlineBreadcrumbs } from '../../@types/globalTypes';
import { TCategory } from '../../data/catalog.data';
import { MobileSideWrapper } from '../../components/ui/SideFilter/MobileSideWrapper';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import {EmptyPage} from '../EmptyPage';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useSort } from '../../hooks/useSort';
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

    const { sortState } = useSort();

    const queryParams = {
        type: type,
        sortParams: sortState.title
    }

    const { data = [], isSuccess, isLoading, isError, error } = useGetCategoryItemsQuery(queryParams);

    const errorData = useErrorHandler({ error, isError });

    const errorObj = {
        title: errorData.status,
        subtitle: 'Произошла ошибка',
        descr: `Произошла ошибка при получении товаров ${res.title} попробуйте обновить страницу или зайдите позже`,
        link_txt: 'Каталог',
        path: '/catalog',
    }

    const emptyObj = {
        title: 'Упс!',
        subtitle: 'Категория пуста',
        descr: `К сожалению в категории ${res.title} нет товаров, но мы уже работаем над расширением ассортимента`,
        link_txt: 'Каталог',
        path: '/catalog',
    }

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

    if (isLoading) {
        return (
            <section className={style['category']}>
                <Headline {...headData} />
                <div className={clsx(style['category-container'], 'container')}>
                    {<SideSkeleton />}
                    <CategoryMain data={data} isLoading={isLoading} />
                </div>
            </section>
        );
    } else if (isError) {
        return <EmptyPage {...errorObj} />
    } else if (isSuccess && !data.length) {
        return <EmptyPage {...emptyObj} />
    } else {
        return (
            <section className={style['category']}>
                <Headline {...headData} />
                <div className={clsx(style['category-container'], 'container')}>
                    <MobileSideWrapper><SideFilter data={data} withSearch /></MobileSideWrapper>
                    <CategoryMain data={data} isLoading={isLoading} />
                </div>
            </section>
        );
    }
}

export default Category;


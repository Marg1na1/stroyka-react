import { FC } from 'react';
import { CategoryMain } from 'components/CategoryMain';
import { Headline } from 'components/Headline';
import { SideSkeleton } from 'skeletons';
import { BreadcrumbsModel } from 'types/models';
import { MobileSideWrapper } from 'components/MobileSideWrapper';
import { SideFilter } from 'components/SideFilter';
import { useScrollToTop } from 'hooks/useScrollToTop';
import { EmptyPage } from 'pages/EmptyPage';
import { useErrorHandler } from 'hooks/useErrorHandler';
import { useSort } from 'hooks/useSort';
import clsx from 'clsx';
import { useLocation, useParams } from 'react-router-dom';
import { useGetCategoryItemsQuery } from 'redux/injected/injectedCategory';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import style from './Category.module.scss';

const Category: FC = () => {

    useScrollToTop();

    const { type = '' } = useParams();

    const locate = useLocation()

    const { sortState } = useSort();

    const filterState = useSelector((state: RootState) => state.sortSlice.filter);

    const queryParams = {
        type: type,
        sortParams: sortState.title,
        range: filterState.range,
        provider: filterState.provider
    }

    const { data = [], isSuccess, isLoading, isError, error } = useGetCategoryItemsQuery(queryParams);

    const errorData = useErrorHandler({ error, isError });

    const errorObj = {
        title: errorData.status,
        subtitle: 'Произошла ошибка',
        descr: `Произошла ошибка при получении товаров ${locate.state} попробуйте обновить страницу или зайдите позже`,
        link_txt: 'Каталог',
        path: '/catalog',
    }

    const emptyObj = {
        title: 'Упс!',
        subtitle: 'Категория пуста',
        descr: `К сожалению в категории ${locate.state} нет товаров, но мы уже работаем над расширением ассортимента`,
        link_txt: 'Каталог',
        path: '/catalog',
    }

    const breadcrumbsArr: BreadcrumbsModel[] = [
        { path: '/', title: 'Главная', type: 'link' },
        { title: '→', type: 'seperator' },
        { path: '/catalog', title: 'Каталог', type: 'link' },
        { title: '→', type: 'seperator' },
        { path: ' ', title: locate.state, type: 'link' },
    ]

    const headData = {
        breadcrumbs: breadcrumbsArr,
        title: locate.state,
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


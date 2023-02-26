import { THeadlineBreadcrumbs } from './../@types/globalTypes';

const breadcrumbsArr: THeadlineBreadcrumbs[] = [
    { path: '/', title: 'Главная', type: 'link' },
    { title: '→', type: 'seperator' },
    { path: ' ', title: 'Все бренды', type: 'link' }
];

export const headData = {
    breadcrumbs: breadcrumbsArr,
    title: "Все бренды",
    layout: './../assets/images/layouts/brands-layout.webp',
}

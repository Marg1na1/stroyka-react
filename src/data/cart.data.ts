import { THeadlineBreadcrumbs } from './../@types/globalTypes';
const breadcrumbsArr: THeadlineBreadcrumbs[] = [
    { path: '/', title: 'Главная', type: 'link' },
    { title: '→', type: 'seperator' },
    { path: ' ', title: 'Корзина', type: 'link' }
];

export const headData = {
    breadcrumbs: breadcrumbsArr,
    title: "Корзина",
    layout: './../assets/images/layouts/busket-layout.webp',
}
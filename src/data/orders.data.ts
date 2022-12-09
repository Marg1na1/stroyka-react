import { THeadlineBreadcrumbs } from './../@types/globalTypes';

const breadcrumbsArr: THeadlineBreadcrumbs[] = [
    { path: '/', title: 'Главная', type: 'link' },
    { title: '→', type: 'seperator' },
    { path: ' ', title: 'Заказы', type: 'link' }
];

export const headData = {
    breadcrumbs: breadcrumbsArr,
    title: "Заказы",
    layout: './../assets/images/layouts/orders-layout.webp',
};

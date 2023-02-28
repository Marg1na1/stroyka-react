import { BreadcrumbsModel } from 'types/models';
const breadcrumbsArr: BreadcrumbsModel[] = [
    { path: '/', title: 'Главная', type: 'link' },
    { title: '→', type: 'seperator' },
    { path: ' ', title: 'Все бренды', type: 'link' }
];

export const headData  = {
    breadcrumbs: breadcrumbsArr,
    title: "Все бренды",
    layout: './../assets/images/layouts/brands-layout.webp',
}

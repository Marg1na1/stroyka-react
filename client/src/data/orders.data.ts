import { BreadcrumbsModel } from "types/models";

const breadcrumbsArr: BreadcrumbsModel[] = [
    { path: '/', title: 'Главная', type: 'link' },
    { title: '→', type: 'seperator' },
    { path: ' ', title: 'Заказы', type: 'link' }
];

export const headData = {
    breadcrumbs: breadcrumbsArr,
    title: "Заказы",
    layout: './../assets/images/layouts/orders-layout.webp',
};

export const emptyOrdersData = {
    title: 'Упс!',
    subtitle: 'Заказов нет',
    descr: 'Перейдите в корзину и сделайте хотябы один заказ',
    link_txt: 'В корзину',
    path: '/cart'
}

import { BreadcrumbsModel } from "types/models";

const breadcrumbsArr: BreadcrumbsModel[] = [
    { path: '/', title: 'Главная', type: 'link' },
    { title: '→', type: 'seperator' },
    { path: ' ', title: 'Корзина', type: 'link' }
];

export const headData = {
    breadcrumbs: breadcrumbsArr,
    title: "Корзина",
    layout: './../assets/images/layouts/busket-layout.webp',
}

export const emptyCartData = {
    title: 'Упс!',
    subtitle: 'Корзина пуста',
    descr: 'Добавьте хотябы один товар в корзину чтобы сделать заказ',
    link_txt: 'К покупкам',
    path: '/catalog'
}
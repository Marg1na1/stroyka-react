import { BreadcrumbsModel } from "types/models";

const breadcrumbsArr: BreadcrumbsModel[] = [
    { path: '/', title: 'Главная', type: 'link' },
    { title: '→', type: 'seperator' },
    { path: ' ', title: 'Контакты', type: 'link' }
];

export const headData = {
    breadcrumbs: breadcrumbsArr,
    title: "Контакты",
}

type TContactsContent = {
    content: string;
    type: string;
}

export const contactsContent: TContactsContent[] = [
    {
        content: '115114, г. Москва, Дербеневская набережная, д. 7, стр. 8',
        type: 'address'
    },
    {
        content: 'Павелецкая Автобусы 13, 106, 158, 184, 632 Остановка «Дербеневская наб., д. 7»',
        type: 'address'
    },
    {
        content: 'ОГРН: 1047796688554',
        type: 'requisites'
    },
    {
        content: 'ИНН 7703528301',
        type: 'requisites'
    },
    {
        content: 'КПП 774850001',
        type: 'requisites'
    },
    {
        content: 'ОКТМО 45380000',
        type: 'requisites'
    },
    {
        content: 'ОГРН 1047796688554',
        type: 'requisites'
    },
    {
        content: 'Расчетный рублевый счет: 40702810900001403352',
        type: 'requisites'
    },
    {
        content: 'Банк: АО «Сбербанк» г. Москва',
        type: 'requisites'
    },
    {
        content: 'Корреспондентский счет: 30101810200000000700',
        type: 'requisites'
    },
    {
        content: 'БИК: 044525700',
        type: 'requisites'
    },
    {
        content: 'info@stroykastore.ru',
        type: 'contacts'
    },
]
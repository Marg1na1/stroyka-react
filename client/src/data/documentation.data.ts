import { BreadcrumbsModel } from "types/models"

const breadcrumbsArr: BreadcrumbsModel[] = [
    { path: '/', title: 'Главная', type: 'link' },
    { title: '→', type: 'seperator' },
    { path: ' ', title: 'Документация', type: 'link' }
]

export const headData = {
    breadcrumbs: breadcrumbsArr,
    title: "Документация",
}

export const listItems = [
    {
        title: 'Оферта «Безопасная сделка»',
        token: '1grWfK7dbSuP0z31C5Jwv0bZufKDoYCVe',
    },
    {
        title: 'Политика конфиденциальности',
        token: '10kS5170MnnAx1NdyaXFgcswI2bCoBd3X',
    },
    {
        title: 'Оферта доставки',
        token: '12Qg3Cp6YA0LfAE_yPetVWVrQZ2-s5jCv',
    },
]
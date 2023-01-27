type TSliderData = {
    title: string;
    descr: string;
    titleClass: string;
    img: string;
}

export const sliderData: TSliderData[] = [
    {
        title: 'Специальные предложения',
        descr: 'На строительные материалы и товары для ремонта',
        titleClass: 'slider-content--first',
        img: './../assets/images/layouts/slide1-layout.webp'
    },
    {
        title: 'Распродажа инструментов',
        descr: '«СтройкаСтор» стремится сделать условия покупки максимально выгодными для каждого покупателя, поэтому на сайте регулярно появляются товары со скидкой.',
        titleClass: 'slider-content--second',
        img: './../assets/images/layouts/slide2-layout.webp'
    },
]
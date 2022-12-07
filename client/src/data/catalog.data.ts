import { THeadlineBreadcrumbs } from "../@types/globalTypes";

const breadcrumbsArr: THeadlineBreadcrumbs[] = [
    { path: '/', title: 'Главная', type: 'link' },
    { title: '→', type: 'seperator' },
    { path: ' ', title: 'Каталог', type: 'link' }
];

export const headData = {
    breadcrumbs: breadcrumbsArr,
    title: "Каталог",
    layout: './../assets/images/layouts/catalog-layout.webp'
}

export type TCategory = {
    title: string;
    image: string;
    list: {
        title: string;
        path: string
    }[];
}

export const categoryData: TCategory[] = [
    {
        title: "Сантехника",
        image: "https://i.ibb.co/6JTwvWQ/catalog1.webp",
        list: [
            {
                title: "Ванны",
                path: "baths"
            },
            {
                title: "Комплектующие для ванн",
                path: "accessories-for-baths"
            },
            {
                title: "Душевые",
                path: "showers"
            },
            {
                title: "Унитазы и биде",
                path: "toilet"
            },
            {
                title: "Смесители",
                path: "mixers"
            },
            {
                title: "Душевое оборудование",
                path: "shower-equipment"
            },
            {
                title: "Раковины",
                path: "sinks"
            },
            {
                title: "Пьедесталы для раковин",
                path: "pedestals-for-sinks"
            }
        ]
    },
    {
        title: "Стройматериалы",
        image: "https://i.ibb.co/WKwhpBs/catalog2.webp",
        list: [
            {
                title: "Сухие смеси",
                path: "dry-mixes"
            },
            {
                title: "Пиломатериалы",
                path: "lumber"
            },
            {
                title: "Гипсокартон",
                path: "drywall"
            },
            {
                title: "Профиль для гипсокартона",
                path: "profile-for-drywall"
            },
            {
                title: "Изоляционные материалы",
                path: "insulation"
            },
            {
                title: "Армирующие материалы",
                path: "reinforcing "
            },
            {
                title: "Кровля",
                path: "roof"
            },
            {
                title: "Ленты строительные",
                path: "construction-tapes"
            }
        ]
    },
    {
        title: "Напольные покрытия",
        image: "https://i.ibb.co/hsTfmt0/catalog3.webp",
        list: [
            {
                title: "Линолеум",
                path: "linoleum"
            },
            {
                title: "Ламинат",
                path: "laminate-flooring"
            },
            {
                title: "Ковролин",
                path: "carpet"
            },
            {
                title: "Плинтус напольный",
                path: "floor-skirting-board"
            },
            {
                title: "Пороги",
                path: "thresholds"
            },
            {
                title: "Подложки",
                path: "substrates"
            },
            {
                title: "Ковровые дорожки",
                path: "carpet-tracks"
            },
            {
                title: "Плитка ПВХ, виниловый ламинат",
                path: "tile"
            }
        ]
    },
    {
        title: "Отделка стени потолка",
        image: "https://i.ibb.co/QbKKPsr/catalog4.webp",
        list: [
            {
                title: "Обои",
                path: "wallpaper"
            },
            {
                title: "Стеновые панели",
                path: "wall-panels"
            },
            {
                title: "Плинтус потолочный",
                path: "ceiling-skirting-board"
            },
            {
                title: "Углы к потолочному плинтусу",
                path: "corners-ceiling-skirting-board"
            },
            {
                title: "Потолочная плитка",
                path: "ceiling-tiles"
            },
            {
                title: "Профили алюминиевые",
                path: "aluminum-profiles"
            },
            {
                title: "Декоративные молдинги, багеты",
                path: "decorative-moldings"
            },
            {
                title: "Пленки самоклеящиеся",
                path: "self-adhesive-films"
            }
        ]
    },
    {
        title: "Керамическая плитка",
        image: "https://i.ibb.co/4wLZfrH/catalog5.webp",
        list: [
            {
                title: "Настенная плитка",
                path: "wall-tiles"
            },
            {
                title: "Напольная плитка",
                path: "floor-tiles"
            },
            {
                title: "Керамогранит",
                path: "porcelain-stoneware"
            },
            {
                title: "Декоративная плитка",
                path: "decorative-tiles"
            },
            {
                title: "Системы выравнивания плитки",
                path: "tile-alignment-systems"
            },
            {
                title: "Уголки и профили для плитки",
                path: "tile-profiles"
            },
            {
                title: "Керамический плинтус",
                path: "ceramic-skirting-board"
            },
            {
                title: "Мозаика",
                path: "mosaic"
            }
        ]
    },
    {
        title: "Двери и окна",
        image: "https://i.ibb.co/ZNswQWB/catalog6.webp",
        list: [
            {
                title: "Межкомнатные двери",
                path: "interior-doors"
            },
            {
                title: "Входные двери",
                path: "entrance-doors"
            },
            {
                title: "Дверные коробки",
                path: "door-frames"
            },
            {
                title: "Арки",
                path: "arches"
            },
            {
                title: "Дверные наличники",
                path: "door-platbands"
            },
            {
                title: "Дверные доборы",
                path: "door-dobs"
            },
            {
                title: "Раздвижные двери",
                path: "sliding-doors"
            },
            {
                title: "Скобяные изделия",
                path: "hardware"
            }
        ]
    },
    {
        title: "Лакокрасочные материалы",
        image: "https://i.ibb.co/7k687Tb/catalog7.webp",
        list: [
            {
                title: "Краски",
                path: "paints"
            },
            {
                title: "Эмали",
                path: "enamels"
            },
            {
                title: "Грунтовки",
                path: "primers"
            },
            {
                title: "Монтажные пены",
                path: "mounting-foams"
            },
            {
                title: "Герметики",
                path: "sealants"
            },
            {
                title: "Клеи",
                path: "adhesives"
            },
            {
                title: "Покрытия для дерева",
                path: "coatings-for-wood"
            },
            {
                title: "Лаки",
                path: "lacquer"
            }
        ]
    },
    {
        title: "Климат и отопление",
        image: "https://i.ibb.co/5WFvvqz/catalog8.webp",
        list: [
            {
                title: "Радиаторы отопления",
                path: "radiators-for-heating"
            },
            {
                title: "Теплый пол",
                path: "underfloor-heating"
            },
            {
                title: "Электрические камины",
                path: "electric-fireplaces"
            },
            {
                title: "Вентиляция",
                path: "ventilation"
            },
            {
                title: "Тепловое оборудование",
                path: "thermal-equipment"
            },
            {
                title: "Котлы отопительные",
                path: "heating-boilers"
            },
            {
                title: "Расширительные баки",
                path: "expansion-tanks"
            },
            {
                title: "Насосы циркуляционные",
                path: "circulation-pumps"
            }
        ]
    },
    {
        title: "Инструменты",
        image: "https://i.ibb.co/HGTnjbk/catalog9.webp",
        list: [
            {
                title: "Электроинструмент",
                path: "power-tools"
            },
            {
                title: "Расходные материалы",
                path: "consumables"
            },
            {
                title: "Малярный инструмент",
                path: "painting-tool"
            },
            {
                title: "Штукатурный инструмент",
                path: "plastering-tool"
            },
            {
                title: "Шлифовальный инструмент",
                path: "grinding-tool"
            },
            {
                title: "Измерительный инструмент",
                path: "measuring-instrument"
            },
            {
                title: "Шпатели",
                path: "spatulas"
            },
            {
                title: "Спецодежда и средства защиты",
                path: "workwear"
            }
        ]
    },
    {
        title: "Крепеж и фурнитура",
        image: "https://i.ibb.co/G22N5KB/catalog10.webp",
        list: [
            {
                title: "Саморезы",
                path: "self-tapping-screws"
            },
            {
                title: "Дюбель",
                path: "dowel"
            },
            {
                title: "Гвозди",
                path: "nails"
            },
            {
                title: "Анкер",
                path: "anchor"
            },
            {
                title: "Болты",
                path: "bolts"
            },
            {
                title: "Гайки",
                path: "nuts"
            },
            {
                title: "Шуруп",
                path: "screw"
            },
            {
                title: "Шайбы",
                path: "washers"
            }
        ]
    },
    {
        title: "Освещение",
        image: "https://i.ibb.co/6rwGyfz/catalog11.webp",
        list: [
            {
                title: "Лампы",
                path: "lamps"
            },
            {
                title: "Люстры",
                path: "chandeliers"
            },
            {
                title: "Потолочные светильники",
                path: "ceiling-lights"
            },
            {
                title: "Светодиодные светильники",
                path: "LED-lights"
            },
            {
                title: "Подвесные светильники",
                path: "pendant-lamps"
            },
            {
                title: "Светодиодные панели",
                path: "LED-panels"
            },
            {
                title: "Бра",
                path: "sconce"
            },
            {
                title: "Настольные лампы",
                path: "desk-lamp"
            }
        ]
    },
    {
        title: "Электротовары",
        image: "https://i.ibb.co/DDLVDB6/catalog12.webp",
        list: [
            {
                title: "Розетки и выключатели",
                path: "sockets-and-switches"
            },
            {
                title: "Кабели и комплектующие",
                path: "cables-and-accessories"
            },
            {
                title: "Телекоммуникации",
                path: "telecommunications"
            },
            {
                title: "Счетчики электроэнергии",
                path: "electricity-meters"
            },
            {
                title: "Автоматические выключатели",
                path: "circuit-breakers"
            },
            {
                title: "Электрические щитки",
                path: "electric-shields"
            },
            {
                title: "Тройники для розетки",
                path: "tees-for-sockets"
            },
            {
                title: "Удлинители электрические",
                path: "electric-extension-cords"
            }
        ]
    }
]
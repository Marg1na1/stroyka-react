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
                path: "plumbing/baths"
            },
            {
                title: "Комплектующие для ванн",
                path: "plumbing/accessories-for-baths"
            },
            {
                title: "Душевые",
                path: "plumbing/showers"
            },
            {
                title: "Унитазы и биде",
                path: "plumbing/toilet"
            },
            {
                title: "Смесители",
                path: "plumbing/mixers"
            },
            {
                title: "Душевое оборудование",
                path: "plumbing/shower-equipment"
            },
            {
                title: "Раковины",
                path: "plumbing/sinks"
            },
            {
                title: "Пьедесталы для раковин",
                path: "plumbing/pedestals-for-sinks"
            }
        ]
    },
    {
        title: "Стройматериалы",
        image: "https://i.ibb.co/WKwhpBs/catalog2.webp",
        list: [
            {
                title: "Сухие смеси",
                path: "building-materials/dry-mixes"
            },
            {
                title: "Пиломатериалы",
                path: "building-materials/lumber"
            },
            {
                title: "Гипсокартон",
                path: "building-materials/drywall"
            },
            {
                title: "Профиль для гипсокартона",
                path: "building-materials/profile-for-drywall"
            },
            {
                title: "Изоляционные материалы",
                path: "building-materials/insulation"
            },
            {
                title: "Армирующие материалы",
                path: "building-materials/reinforcing "
            },
            {
                title: "Кровля",
                path: "building-materials/roof"
            },
            {
                title: "Ленты строительные",
                path: "building-materials/construction-tapes"
            }
        ]
    },
    {
        title: "Напольные покрытия",
        image: "https://i.ibb.co/hsTfmt0/catalog3.webp",
        list: [
            {
                title: "Линолеум",
                path: "floor-coverings/linoleum"
            },
            {
                title: "Ламинат",
                path: "floor-coverings/laminate-flooring"
            },
            {
                title: "Ковролин",
                path: "floor-coverings/carpet"
            },
            {
                title: "Плинтус напольный",
                path: "floor-coverings/floor-skirting-board"
            },
            {
                title: "Пороги",
                path: "floor-coverings/thresholds"
            },
            {
                title: "Подложки",
                path: "floor-coverings/substrates"
            },
            {
                title: "Ковровые дорожки",
                path: "floor-coverings/carpet-tracks"
            },
            {
                title: "Плитка ПВХ, виниловый ламинат",
                path: "floor-coverings/tile"
            }
        ]
    },
    {
        title: "Отделка стен и потолка",
        image: "https://i.ibb.co/QbKKPsr/catalog4.webp",
        list: [
            {
                title: "Обои",
                path: "decoration/wallpaper"
            },
            {
                title: "Стеновые панели",
                path: "decoration/wall-panels"
            },
            {
                title: "Плинтус потолочный",
                path: "decoration/ceiling-skirting-board"
            },
            {
                title: "Углы к потолочному плинтусу",
                path: "decoration/corners-ceiling-skirting-board"
            },
            {
                title: "Потолочная плитка",
                path: "decoration/ceiling-tiles"
            },
            {
                title: "Профили алюминиевые",
                path: "decoration/aluminum-profiles"
            },
            {
                title: "Декоративные молдинги, багеты",
                path: "decoration/decorative-moldings"
            },
            {
                title: "Пленки самоклеящиеся",
                path: "decoration/self-adhesive-films"
            }
        ]
    },
    {
        title: "Керамическая плитка",
        image: "https://i.ibb.co/4wLZfrH/catalog5.webp",
        list: [
            {
                title: "Настенная плитка",
                path: "ceramic-tile/wall-tiles"
            },
            {
                title: "Напольная плитка",
                path: "ceramic-tile/floor-tiles"
            },
            {
                title: "Керамогранит",
                path: "ceramic-tile/porcelain-stoneware"
            },
            {
                title: "Декоративная плитка",
                path: "ceramic-tile/decorative-tiles"
            },
            {
                title: "Системы выравнивания плитки",
                path: "ceramic-tile/tile-alignment-systems"
            },
            {
                title: "Уголки и профили для плитки",
                path: "ceramic-tile/tile-profiles"
            },
            {
                title: "Керамический плинтус",
                path: "ceramic-tile/ceramic-skirting-board"
            },
            {
                title: "Мозаика",
                path: "ceramic-tile/mosaic"
            }
        ]
    },
    {
        title: "Двери и окна",
        image: "https://i.ibb.co/ZNswQWB/catalog6.webp",
        list: [
            {
                title: "Межкомнатные двери",
                path: "doors-windows/interior-doors"
            },
            {
                title: "Входные двери",
                path: "doors-windows/entrance-doors"
            },
            {
                title: "Дверные коробки",
                path: "doors-windows/door-frames"
            },
            {
                title: "Арки",
                path: "doors-windows/arches"
            },
            {
                title: "Дверные наличники",
                path: "doors-windows/door-platbands"
            },
            {
                title: "Дверные доборы",
                path: "doors-windows/door-dobs"
            },
            {
                title: "Раздвижные двери",
                path: "doors-windows/sliding-doors"
            },
            {
                title: "Скобяные изделия",
                path: "doors-windows/hardware"
            }
        ]
    },
    {
        title: "Лакокрасочные материалы",
        image: "https://i.ibb.co/7k687Tb/catalog7.webp",
        list: [
            {
                title: "Краски",
                path: "paints-varnishes/paints"
            },
            {
                title: "Эмали",
                path: "paints-varnishes/enamels"
            },
            {
                title: "Грунтовки",
                path: "paints-varnishes/primers"
            },
            {
                title: "Монтажные пены",
                path: "paints-varnishes/mounting-foams"
            },
            {
                title: "Герметики",
                path: "paints-varnishes/sealants"
            },
            {
                title: "Клеи",
                path: "paints-varnishes/adhesives"
            },
            {
                title: "Покрытия для дерева",
                path: "paints-varnishes/coatings-for-wood"
            },
            {
                title: "Лаки",
                path: "paints-varnishes/lacquer"
            }
        ]
    },
    {
        title: "Климат и отопление",
        image: "https://i.ibb.co/5WFvvqz/catalog8.webp",
        list: [
            {
                title: "Радиаторы отопления",
                path: "climate-heating/radiators-for-heating"
            },
            {
                title: "Теплый пол",
                path: "climate-heating/underfloor-heating"
            },
            {
                title: "Электрические камины",
                path: "climate-heating/electric-fireplaces"
            },
            {
                title: "Вентиляция",
                path: "climate-heating/ventilation"
            },
            {
                title: "Тепловое оборудование",
                path: "climate-heating/thermal-equipment"
            },
            {
                title: "Котлы отопительные",
                path: "climate-heating/heating-boilers"
            },
            {
                title: "Расширительные баки",
                path: "climate-heating/expansion-tanks"
            },
            {
                title: "Насосы циркуляционные",
                path: "climate-heating/circulation-pumps"
            }
        ]
    },
    {
        title: "Инструменты",
        image: "https://i.ibb.co/HGTnjbk/catalog9.webp",
        list: [
            {
                title: "Электроинструмент",
                path: "tools/power-tools"
            },
            {
                title: "Расходные материалы",
                path: "tools/consumables"
            },
            {
                title: "Малярный инструмент",
                path: "tools/painting-tool"
            },
            {
                title: "Штукатурный инструмент",
                path: "tools/plastering-tool"
            },
            {
                title: "Шлифовальный инструмент",
                path: "tools/grinding-tool"
            },
            {
                title: "Измерительный инструмент",
                path: "tools/measuring-instrument"
            },
            {
                title: "Шпатели",
                path: "tools/spatulas"
            },
            {
                title: "Спецодежда и средства защиты",
                path: "tools/workwear"
            }
        ]
    },
    {
        title: "Крепеж и фурнитура",
        image: "https://i.ibb.co/G22N5KB/catalog10.webp",
        list: [
            {
                title: "Саморезы",
                path: "fasteners-accessories/self-tapping-screws"
            },
            {
                title: "Дюбель",
                path: "fasteners-accessories/dowel"
            },
            {
                title: "Гвозди",
                path: "fasteners-accessories/nails"
            },
            {
                title: "Анкер",
                path: "fasteners-accessories/anchor"
            },
            {
                title: "Болты",
                path: "fasteners-accessories/bolts"
            },
            {
                title: "Гайки",
                path: "fasteners-accessories/nuts"
            },
            {
                title: "Шуруп",
                path: "fasteners-accessories/screw"
            },
            {
                title: "Шайбы",
                path: "fasteners-accessories/washers"
            }
        ]
    },
    {
        title: "Освещение",
        image: "https://i.ibb.co/6rwGyfz/catalog11.webp",
        list: [
            {
                title: "Лампы",
                path: "lighting/lamps"
            },
            {
                title: "Люстры",
                path: "lighting/chandeliers"
            },
            {
                title: "Потолочные светильники",
                path: "lighting/ceiling-lights"
            },
            {
                title: "Светодиодные светильники",
                path: "lighting/LED-lights"
            },
            {
                title: "Подвесные светильники",
                path: "lighting/pendant-lamps"
            },
            {
                title: "Светодиодные панели",
                path: "lighting/LED-panels"
            },
            {
                title: "Бра",
                path: "lighting/sconce"
            },
            {
                title: "Настольные лампы",
                path: "lighting/desk-lamp"
            }
        ]
    },
    {
        title: "Электротовары",
        image: "https://i.ibb.co/DDLVDB6/catalog12.webp",
        list: [
            {
                title: "Розетки и выключатели",
                path: "electrical-goods/sockets-and-switches"
            },
            {
                title: "Кабели и комплектующие",
                path: "electrical-goods/cables-and-accessories"
            },
            {
                title: "Телекоммуникации",
                path: "electrical-goods/telecommunications"
            },
            {
                title: "Счетчики электроэнергии",
                path: "electrical-goods/electricity-meters"
            },
            {
                title: "Автоматические выключатели",
                path: "electrical-goods/circuit-breakers"
            },
            {
                title: "Электрические щитки",
                path: "electrical-goods/electric-shields"
            },
            {
                title: "Тройники для розетки",
                path: "electrical-goods/tees-for-sockets"
            },
            {
                title: "Удлинители электрические",
                path: "electrical-goods/electric-extension-cords"
            }
        ]
    }
]
import { THeadlineBreadcrumbs } from './../@types/globalTypes';

const breadcrumbsArr: THeadlineBreadcrumbs[] = [
    { path: '/', title: 'Главная', type: 'link' },
    { title: '→', type: 'seperator' },
    { path: ' ', title: 'Возврат', type: 'link' }
];

export const headData = {
    breadcrumbs: breadcrumbsArr,
    title: "Возврат",
    descr: 'Ошиблись при выборе товара? Передумали? Ничего страшного! СтройкаСтор в течение 7 дней готова принять обратно или обменять Ваш товар',
    layout: './../assets/images/layouts/refund-layout.webp',
};

type TRefundList = {
    title: string;
    content: string[];
}

export const refundList: TRefundList[] = [
    {
        title: 'Возврат товара ненадлежащего качества',
        content: [
            'В случае, если вы обнаружили недостаток у товара, сообщите об этом менеджеру магазина, в котором вы оформляли заказ в срок до 20 дней после дня получения заказа.',
            'Если вы обнаружили, что с товаром что-то не так:',
            'Если вы решили отказаться от товара при его получении, сообщите водителю о том, что вы обнаружили проблему у товара. Вам будет предложено заполнить необходимые документы (в т. ч. акт возврата), после чего товар будет возвращен в магазин.',
            'Пожалуйста, имейте в виду, что при возврате товаров магазину может потребоваться проведение экспертизы.',

        ]
    },
    {
        title: 'Возврат денежных средств',
        content: [
            'После возврата товара в магазин СтройкаСтор и, при необходимости, проведения экспертизы, вам будут возвращены денежные средства в размере стоимости приобретенного товара. В случае возврата оплаты за товар надлежащего качества стоимость оплаченной доставки или оказанных дополнительных услуг не возвращается. Если проведение экспертизы возвращаемого товара не требуется, операция по возврату денежных средств будет произведена в течение следующего рабочего дня по графику работы магазина. Пожалуйста, имейте ввиду, что поступление возвращенных средств на вашу карту зависит от сроков возврата, установленных банком вашей пластиковой карты.',           
        ]
    },
    {
        title: 'Обмен',
        content: [
            'Вы можете обменять товар из своего заказа на другой, более подходящий для вас, как в процессе обработки вашего заказа, так и после получения вами вашего заказа, за исключением товаров, которые не подлежат возврату и обмену по законодательству РФ.',
            'До сборки (и отправки в службу доставки) вашего заказа обмен товаров возможен путем корректировки заказа менеджером магазина по согласованию с вами. После получения своего заказа вы также можете произвести обмен приобретенного вами товара, за исключением товаров, которые не подлежат возврату и обмену по законодательству РФ. В случае обмена товара надлежащего качества стоимость оплаченной доставки или оказанных дополнительных услуг не возвращается.',
            'Возврат товара для его обмена производится согласно правилам возврата товара надлежащего или ненадлежащего качества, описанных выше.',
            'Пожалуйста, имейте ввиду, что при обмене/возврате товаров магазину может потребоваться проведение экспертизы.'
        ]
    },
]
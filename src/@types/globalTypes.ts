export type TCard = {
    id: number;
    fixId: number;
    img: string;
    title: string;
    provider: string;
    rating: number;
    price: number;
    type: string;
    discount: string;
    discountAmount?: number;
}
export type TCartCard = {
    createdAt: string;
    id: string;
    img: string;
    title: string;
    finalPrice: number;
    fixId: number;
    provider: string;
    count: number;
}

export type THeadlineBreadcrumbs = {
    path?: string;
    title: string;
    type: 'link' | 'seperator';
}

export type TReviews = {
    avatar: string;
    content: string;
    name: string;
    createdAt: string;
}
export type TBrands = {
    title: string;
    list: string[]
}
export type TOrdersType = {
    [key: number]: TCartCard
    createdAt: string;
    id: string;
}

//////////////////////////////////////////


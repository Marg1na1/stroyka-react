export type TCard = {
    id: number;
    fixId: number;
    img: string;
    title: string;
    provider: string;
    rating: number;
    price: number;
    type: number;
    discount: string;
    discountAmount?: number;
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
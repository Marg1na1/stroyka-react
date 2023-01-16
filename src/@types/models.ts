export interface ProductModel {
    id: string;
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

export interface CartProductModel {
    createdAt: string;
    id: string;
    img: string;
    title: string;
    finalPrice: number;
    fixId: number;
    provider: string;
    count: number;
}

export interface OrderModel {
    [key: number]: CartProductModel
    createdAt: string;
    id: string;
}

export interface TransmittedData {
    img: string;
    title: string;
    finalPrice: number;
    fixId: number;
    provider: string;
    count: number;
    id: number;
}



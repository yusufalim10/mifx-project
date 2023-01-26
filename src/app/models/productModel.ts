export interface productModel {
    id: string,
    image: string,
    images: string[],
    name: string,
    price: string,
    special? : boolean,
    specialPrice?: string,
    off?: string,
    rating?: number,
    new?: boolean,
    isFav?: boolean,
    outOfStock?: boolean,
    reviewCount: number,
    sizes: number[],
    description?: string
}

export interface productState {
    products: productModel[],
    cart: productModel[],
    cartView: boolean
}
export class CartProduct {
    id: string;
    name: string;
    price: { realPrice: number, offerPrice: number };
    image: string;
    options: string[];
    varient: string;
    quantity: number;
}

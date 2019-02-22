export class Product {
    public id: string;
    public name: string;
    public description: string;
    public options: any[];
    public varients: any[];
    public productImages: any[];
    public price: { realPrice: number, offerPrice: number };

}

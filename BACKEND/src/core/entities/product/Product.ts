import { ProductFeature } from "./ProductFeature";
import { Marque } from "./Brand";

export class Product{
    constructor(
        public readonly id: number,
        public name: string,
        public description: string,
        public priceExclTax: number,
        public brand: Marque,
        public stockQty: number,
        public image: string,
        public features: ProductFeature[] = []
    ){}
}
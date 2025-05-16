import { ProductFeature } from "./ProductFeature";
import { Brand } from "./Brand";

export class Product{
    constructor(
        public readonly id: number,
        public name: string,
        public description: string,
        public priceExclTax: number,
        public brand: Brand,
        public stockQty: number,
        public image: string,
        public features: ProductFeature[] = []
    ){}
} 
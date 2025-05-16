import { Feature } from './Feature';

export class ProductFeature {
    constructor(
        public readonly id: number,
        public feature: Feature,
    ){}
}
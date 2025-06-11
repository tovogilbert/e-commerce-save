
export class Payment{
    constructor(
        public readonly id: number,
        public paymentDate: Date = new Date(),
        public amount: number,
        public method: string,
        public transactionRef : string,
    ){}
}   
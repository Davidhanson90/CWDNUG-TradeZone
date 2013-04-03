/// <reference path='../includes/ts/linq.d.ts' />
/// <reference path='../includes/ts/angular.d.ts' />

class Company {
    constructor(company)
    {
        angular.extend(this, company);
        this.open = this.prices[0];
        this.high = Enumerable.from(this.prices).max();
        this.low = Enumerable.from(this.prices).min();
        this.last = Enumerable.from(this.prices).last();
        this.up = this.last > this.open;
    }
    public up: bool;
    public name: string;
    public symbol: string;
    public volume: number;
    public open: number;
    public high: number;
    public low: number;
    public last: number;
    public prices: number[] = [];
    addPrice(price: number): void {
        this.volume += this.last > price ? -1 : 1;
        this.up = price > this.last;
        this.last = price;
        this.high = Math.max(this.high, price);
        this.low = Math.min(this.low, price);
    }
}

class Price {
    constructor(
        public price: number,
        public timestamp: number) { }
}


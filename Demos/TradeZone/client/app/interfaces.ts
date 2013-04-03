/// <reference path="../includes/ts/angular.d.ts" />
/// <reference path="../includes/ts/rx.js.d.ts" />
/// <reference path="../app/model.ts" />

interface IHomeScope extends ng.Scope {
    homeViewModel: IHomeViewModel;
}

interface IHomeViewModel {
    symbol: string;
    filter: string;
    companies: Company[];
    addCompany(): void;
    companiesFiltered(): Company[];
    addPrice(price: number): void;
    digest(): void;
    startStreaming(company: Company): void;
    newPrice: Price;
    fastPrice: number;
    updatesPerSecond: number;
}

interface IRealtimePricingService {
    start(company: Company): Rx.IObservable;
}

interface IPortfolioService {
    getPortfolio(portfolioId: string, callback: (companies: Company[]) => void ): void;
    addCompany(symbol: string, callback: (company: Company) => void ): void;
}

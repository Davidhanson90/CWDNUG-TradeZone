/// <reference path="../includes/ts/angular.d.ts" />
/// <reference path="../includes/ts/linq.d.ts" />
/// <reference path="../app/model.ts" />
/// <reference path="../app/interfaces.ts" />
/// <reference path="../includes/ts/rx.js.d.ts" />

class HomeViewModel implements IHomeViewModel {
    private sampleRate: number = 1000;
    private currentStreamingCompany: Company;
    public symbol: string = '';
    public companies: Company[];
    public series: Price[] = [];
    public newPrice: Price;
    public fastPrice: number;
    public updatesPerSecond: number;
    public filter: string = '';
    public digest: () => void = () => { };
    private sub1: Rx.ISerialDisposable = new Rx.SerialDisposable();
    private sub2: Rx.ISerialDisposable = new Rx.SerialDisposable();


        constructor(
        private realtimePricingService: IRealtimePricingService,
        private portfolioService: IPortfolioService,
        private $timeout: ng.Timeout) {

        // Call service to get list of companies.
        portfolioService.getPortfolio('100', (results) => {
            this.companies = results;
        });
    }

    addCompany(): void {
        var symbol = this.symbol.trim().toUpperCase();
        if (symbol) {
            if (Enumerable.from(this.companies).any(c => c.symbol == symbol)) {
                alert("You've already added " + symbol);
                return;
            }
            this.portfolioService.addCompany(symbol, (company) => {
                this.companies.push(new Company(company));
            });
        }
        else {
            alert('Please enter a valid symbol');
        }
        this.symbol = '';
    }

    startStreaming(company: Company): void {
        this.currentStreamingCompany = company;
        var priceStream = this.realtimePricingService.start(company);
        this.sub1.disposable(
            priceStream.bufferWithTime(1000)
            .subscribe(list => {
                this.updatesPerSecond = list.length;
            }));

        this.sub2.disposable(
            priceStream.doAction(x => {
            this.fastPrice = x;
            this.digest();
        })
        .sample(this.sampleRate)
        .subscribe(price => this.$timeout(() => this.addPrice(price))));
    }

    addPrice(price: number): void {
        this.currentStreamingCompany.addPrice(price);
        this.newPrice = new Price(parseFloat(price.toString()), new Date().getTime());
    }

    companiesFiltered(): Company[] {
        var filterText = this.filter.trim();
        if (filterText.length < 2) {
            return this.companies;
        }
        var filter = new RegExp(filterText, "i");
        return Enumerable.from(this.companies)
            .where(c => ~c.name.search(filter)
                     || ~c.symbol.search(filter))
            .toArray();
    }
}


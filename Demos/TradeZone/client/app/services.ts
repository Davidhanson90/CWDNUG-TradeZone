/// <reference path="../includes/ts/angular.d.ts" />
/// <reference path="../app/model.ts" />
/// <reference path="../app/interfaces.ts" />
/// <reference path='../includes/ts/signalr.d.ts' />
/// <reference path="../includes/ts/rx.js.d.ts" />
/// <reference path="../includes/ts/linq.d.ts" />

class PortfolioService implements IPortfolioService {

    constructor(private $http: ng.Http) { }

    getPortfolio(portfolioId :string, callback: (companies: Company[]) => void ) {
        this.$http.get('/api/portfolio/' + portfolioId)
            .then((response) =>
            {
                var companies = Enumerable.from(response.data)
                .select(c => new Company(c)).toArray();

                callback(companies);
            });
    }

    addCompany(symbol: string, callback: (company: Company) => void ){
        this.$http.get('/api/portfolio/getBySymbol/' + symbol)
            .then((response) =>
            {
                callback(<Company> response.data);
            });
    }
}

class RealtimePricingService implements IRealtimePricingService {
    private current: Company;
    private connection: SignalR;
    private listener: (price: number) => void;
    private sub: Rx.ISerialDisposable = new Rx.SerialDisposable();

    start(company: Company): Rx.IObservable {

        if (this.connection) {
            this.connection.stop();
        }

        this.connection = $.connection('/stream', 'symbol=' + company.symbol, false);

        this.connection.start()
                  .done(() =>
                  {
                      console.log('RealtimePricingService started');
                  });

            var stream = Rx.Observable.create(o => {
                this.connection.received((item) =>
                {
                    o.onNext(item);
                });
                return () => { };
            })
            .publish();
        this.sub.disposable(stream.connect());
        return stream;
    }
}
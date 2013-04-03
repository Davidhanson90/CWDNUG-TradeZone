/// <reference path="includes/ts/angular.d.ts" />
/// <reference path='app/services.ts' />
/// <reference path='app/viewmodels.ts' />

/****** App definition ******/
var app = angular.module('TradeZone', ['directives']);

app.config(($routeProvider) => {
    $routeProvider
        .when('/login', { templateUrl: 'pages/login.html' })
        .when('/home', { templateUrl: 'pages/home.html' })
        .otherwise({ redirectTo: '/login' });
});

factory('realtimePricingService', RealtimePricingService);
factory('portfolioService', PortfolioService);
factory('homeVm', HomeViewModel);

function factory(service: string, factoryMethod: Function, locals?: any){
    app.factory(service, ($injector) => {
        return $injector.instantiate(factoryMethod, locals);
    });
}
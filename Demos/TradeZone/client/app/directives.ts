/// <reference path="../includes/ts/highcharts.d.ts" />
/// <reference path="../includes/ts/angular.d.ts" />
/// <reference path='../app/services.ts' />
/// <reference path='../app/viewmodels.ts' />

var directiveModule = angular.module('directives', []);

directiveModule.directive('chart', (realtimePricingService: IRealtimePricingService) => {
    return {
        restrict: 'E',
        link: (scope, elem, attrs) => {

            $(document).ready(() => {
                Highcharts.setOptions({
                    global: {
                        useUTC: false
                    }
                });

                elem.highcharts({
                    chart: {
                        type: 'spline',
                        marginRight: 10,
                        loaded : false,
                        events: {
                            load: function () {
                                // todo: input the binding path? 
                                scope.$watch('homeViewModel.newPrice', (newValue: Price, oldValue) => {

                                    if (newValue) {
                                        this.series[0].addPoint([newValue.timestamp, newValue.price], true, true);
                                    }
                                });
                            }
                        }
                    },
                    title: {
                        text: 'Price stream'
                    },
                    xAxis: {
                        type: 'datetime',
                        tickPixelInterval: 150
                    },
                    yAxis: {
                        title: {
                            text: 'Price'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                        formatter: function() {
                            return '<b>' + this.series.name + '</b><br/>' +
                            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                            Highcharts.numberFormat(this.y, 2);
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    exporting: {
                        enabled: false
                    },
                    series: [{
                        name: 'Stock price',
                        data: (function() {
                            // generate an array of random data
                            var data = [],
                                time = (new Date()).getTime(),
                                i;

                            for (i = -19; i <= 0; i++) {
                                data.push({
                                    x: time + i * 1000,
                                    y: 5
                                });
                            }
                            return data;
                        })()
                    }]
                });
            });
        }
    };
});
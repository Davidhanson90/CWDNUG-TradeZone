/// <reference path="../app/viewmodels.ts" />
/// <reference path="../app/interfaces.ts" />
/// <reference path="../includes/ts/angular.d.ts" />

class LoginController {
    constructor($scope, $location: ng.Location) {
        $scope.Login = () => $location.path('/home');
    }
}

class HomeController {
    constructor(
        $scope: IHomeScope,
        homeVm: IHomeViewModel) {
        homeVm.digest = () => $scope.$digest();
        $scope.homeViewModel = homeVm;
    }
}

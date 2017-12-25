(function() {
  'use strict';

  angular
    .module('biweb')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .state('dashboard', {
        url: '/dashboard',
        controller: 'DashboardController',
        templateUrl: 'app/secure/dashboard/dashboard.html',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();

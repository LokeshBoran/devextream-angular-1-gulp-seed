(function() {
  'use strict';

  angular
    .module('biweb')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController() {
    var vm = this;
    vm.page = 'Dashboard Page';
    
    activate();

    function activate() {

    }

  }
})();

/* global moment:false, _:false */
(function() {
  'use strict';

  angular
    .module('biweb')
    .constant('moment', moment)
    .constant('URL', {
      api: 'http://localhost:1202'
    })
    .constant('_', _);

})();

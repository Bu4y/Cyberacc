(function () {
  'use strict';

  angular
    .module('gls')
    .controller('GlsListController', GlsListController);

  GlsListController.$inject = ['GlsService', 'Authentication'];

  function GlsListController(GlsService, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.gls = GlsService.query();
  }
}());

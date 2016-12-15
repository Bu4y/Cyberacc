(function () {
  'use strict';

  angular
    .module('quotations')
    .controller('QuotationsListController', QuotationsListController);

  QuotationsListController.$inject = ['QuotationsService','Authentication'];

  function QuotationsListController(QuotationsService,Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.quotations = QuotationsService.query();
  }
}());

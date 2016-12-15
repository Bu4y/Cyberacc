(function () {
  'use strict';

  angular
    .module('invoices')
    .controller('InvoicesListController', InvoicesListController);

  InvoicesListController.$inject = ['InvoicesService', 'Authentication'];

  function InvoicesListController(InvoicesService, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.invoices = InvoicesService.query();
  }
}());

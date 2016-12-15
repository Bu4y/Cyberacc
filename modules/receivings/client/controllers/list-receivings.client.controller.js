(function () {
  'use strict';

  angular
    .module('receivings')
    .controller('ReceivingsListController', ReceivingsListController);

  ReceivingsListController.$inject = ['ReceivingsService', 'Authentication'];

  function ReceivingsListController(ReceivingsService, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.receivings = ReceivingsService.query();
  }
} ());

(function () {
  'use strict';

  angular
    .module('companies')
    .controller('CompaniesListController', CompaniesListController);

  CompaniesListController.$inject = ['CompaniesService', 'Authentication'];

  function CompaniesListController(CompaniesService, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.companies = CompaniesService.query();
  }
} ());

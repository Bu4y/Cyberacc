(function () {
  'use strict';

  // Products controller
  angular
    .module('products')
    .controller('ProductsController', ProductsController);

  ProductsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'productResolve'];

  function ProductsController($scope, $state, $window, Authentication, product) {
    var vm = this;

    vm.authentication = Authentication;
    vm.product = product;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.init = init;
    if (vm.product.isincludevat === undefined) {
      vm.product.isincludevat = false;
    }

    function init() {
      vm.categories = [{ 'key': 'P', 'value': 'Product' }, { 'key': 'R', 'value': 'Rent' }, { 'key': 'S', 'value': 'Service' }, { 'key': 'E', 'value': 'Expense' }];
    }

    // Remove existing Product
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.product.$remove($state.go('products.list'));
      }
    }

    // Save Product
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.productForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.product._id) {
        vm.product.$update(successCallback, errorCallback);
      } else {
        vm.product.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('products.view', {
          productId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
} ());

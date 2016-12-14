(function () {
  'use strict';

  // Receivings controller
  angular
    .module('receivings')
    .controller('ReceivingsController', ReceivingsController);

  ReceivingsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'receivingResolve', 'ProductsService', 'CompaniesService'];

  function ReceivingsController ($scope, $state, $window, Authentication, receiving, ProductsService, CompaniesService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.receiving = receiving;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.setData = setData;
    vm.readClient = readClient;
    vm.readProduct = readProduct;
    vm.selectCustomer = selectCustomer;
    vm.creditdayChanged = creditdayChanged;
    vm.calculate = calculate;
    vm.addItem = addItem;
    vm.init = init;
    vm.selectedProduct = selectedProduct;
    vm.selectedProductss = null;
    vm.removeItem = removeItem;
    vm.productChanged = productChanged;

    var dat = new Date();
    Date.prototype.addDays = function (days) {
      var dat = new Date(vm.receiving.docdate);
      dat.setDate(dat.getDate() + days);
      return dat;
    };

    function creditdayChanged(docdate) {

      vm.receiving.drilldate = dat.addDays(vm.receiving.creditday);



    }

    function setData() {
      if (!vm.receiving._id) {
        vm.receiving.docdate = new Date();
        vm.receiving.drilldate = new Date();
        vm.receiving.items = [{
          product: new ProductsService(),
          qty: 1
        }];
      } else {
        vm.receiving.docdate = new Date(vm.receiving.docdate);
        vm.receiving.drilldate = new Date(vm.receiving.drilldate);
        console.log(vm.receiving);
      }
    }

    function readClient() {

      vm.client = CompaniesService.query();

    }

    function selectCustomer() {
      vm.receiving.creditday = vm.receiving.client.creditday;
      vm.receiving.drilldate = dat.addDays(vm.receiving.creditday);
      creditdayChanged();
    }


    function readProduct() {

      vm.products = ProductsService.query();

    }

    function calculate(item) {

      item.unitprice = item.unitprice || item.product.priceexcludevat;
      item.qty = item.qty || 1;
      item.amount = item.unitprice * item.qty;
      item.whtamount = item.whtamount || 0;
      item.vatamount = item.amount * 0.07;
      if (item.product.category === 'S') {
        item.whtamount = item.amount * 0.03;
      } else if (item.product.category === 'R') {
        item.whtamount = item.amount * 0.05;
      }
      item.totalamount = (item.amount + item.vatamount) - item.whtamount;



      sumary();

    }
    function sumary() {
      vm.receiving.amount = 0;
      vm.receiving.vatamount = 0;
      vm.receiving.whtamount = 0;
      vm.receiving.totalamount = 0;
      vm.receiving.items.forEach(function (itm) {
        vm.receiving.amount += itm.amount || 0;
        vm.receiving.vatamount += itm.vatamount || 0;
        vm.receiving.whtamount += itm.whtamount || 0;
        vm.receiving.totalamount += itm.totalamount || 0;
      });
    }
    function addItem() {
      vm.receiving.items.push({
        product: new ProductsService(),
        qty: 1
      });
    }
    function removeItem(item) {
      //vm.receiving.items.splice(item); 
      vm.receiving.items.splice(vm.receiving.items.indexOf(item), 1);

      sumary();
    }
    function productChanged(item) {
      item.unitprice = item.product.priceexcludevat;
      item.qty = item.qty || 1;
      item.amount = item.unitprice * item.qty;
      item.whtamount = item.whtamount || 0;
      item.vatamount = item.amount * 0.07;
      if (item.product.category === 'S') {
        item.whtamount = item.amount * 0.03;
      } else if (item.product.category === 'R') {
        item.whtamount = item.amount * 0.05;
      }
      item.totalamount = (item.amount + item.vatamount) - item.whtamount;



      sumary();
    }

    function init() {

      vm.setData();
      vm.readClient();
      vm.readProduct();

    }

    function selectedProduct() {
      console.log(vm.selectedProductss);
      vm.receiving.items.push({
        product: new ProductsService(),
        qty: 1
      });
    }

    // Remove existing Receiving
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.receiving.$remove($state.go('receivings.list'));
      }
    }

    // Save Receiving
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.receivingForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.receiving._id) {
        vm.receiving.$update(successCallback, errorCallback);
      } else {
        vm.receiving.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('receivings.view', {
          receivingId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

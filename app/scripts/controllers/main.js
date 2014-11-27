'use strict';

/**
 * @ngdoc function
 * @name ergosimoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ergosimoApp
 */
angular.module('ergosimoApp').controller('MainCtrl', function ($scope, $log) {

  $scope.init = function() {
    $log.log('Initing');
    resetDateOfIssue();
    resetDateOfPay();
    resetAmount();
  }

  $scope.ergosima = [];
  $scope.today = new Date();

  $scope.addErgosimo = function () {
  	var ergosimo = {
  		number: $scope.ergosima.length + 1,
      dateOfIssue: $scope.dateOfIssue,
      dateOfPay: $scope.dateOfPay,
      amount: $scope.amount
  	}
  	$scope.ergosima.push(ergosimo);

    resetDateOfIssue();
    resetDateOfPay();
    resetAmount();
  }

  var resetDateOfIssue = function() {
    $scope.dateOfIssue = null;
  }

  var resetDateOfPay = function() {
    $scope.dateOfPay = null;
  }

  var resetAmount = function() {
    $scope.amount = null;
  }

  $scope.init();


  $scope.disableWeekends = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  // Date of issue
  $scope.openDateOfIssue = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.dateOfIssueOpened = true;
  };

  // Date of pay
  $scope.openDateOfPay = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.dateOfPayOpened = true;
  };

});



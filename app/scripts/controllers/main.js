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

  $scope.ergosima = [
  {
    dateOfIssue: new Date("October 13, 2014 11:13:00"),
    dateOfPay: new Date("October 13, 2014 11:13:00"),
    amount: 100
  },
  {
    dateOfIssue: new Date("September 12, 2014 11:13:00"),
    dateOfPay: new Date("September 12, 2014 11:13:00"),
    amount: 100
  },
  {
    dateOfIssue: new Date("November 14, 2014 11:13:00"),
    dateOfPay: new Date("November 14, 2014 11:13:00"),
    amount: 100
  }
  ];

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

  $scope.isFirstOfTrimester = function(ergosimo) {
    if(isInQuarter(ergosimo, 2014, 1)) {
      return isFirstOfQuarter(ergosimo, 2014, 1);
    }
    return true;
  }

  var isInQuarter = function(ergosimo, year, quarterNumber) {
    return (ergosimo.dateOfPay.getYear() == year && ergosimo.dateOfPay.getMonth() == quarterNumber * 3 + 0)
      || (ergosimo.dateOfPay.getYear() == year && ergosimo.dateOfPay.getMonth() == quarterNumber * 3 + 1)
      || (ergosimo.dateOfPay.getYear() == year && ergosimo.dateOfPay.getMonth() == quarterNumber * 3 + 2);
  }

  var isFirstOfQuarter = function(ergosimo, year, quarterNumber) {

    var quarterErgosima = $scope.ergosima.filter(function(ergosimo) {
      return ergosimo.dateOfPay.getYear() == year
        && ergosimo.dateOfPay.getMonth() >= quarterNumber * 3
        && ergosimo.dateOfPay.getMonth() < (quarterNumber + 1) * 3
    });
    
    quarterErgosima.sort(function(erg1, erg2) {
      if (erg1.dateOfPay > erg2.dateOfPay) {
        return 1;
      } else if (erg1.dateOfPay < erg2.dateOfPay) {
        return -1;
      } else {
        return 0;
      }
    });

    return quarterErgosima[0] == ergosimo;
  }

  $scope.monthsOfTrimester = function(ergosimo) {
    return 1;
  }

  $scope.trimesterAmount = function(ergosimo) {
    return null;
  }

});



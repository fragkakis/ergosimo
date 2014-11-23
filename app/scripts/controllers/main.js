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
        resetSelectedMonth();
        resetSelectedYear();
        resetDays();
    }

  $scope.ergosima = [];

  $scope.addErgosimo = function () {
  	var ergosimo = {
  		number: $scope.ergosima.length + 1,
      month: $scope.selectedMonth,
      year: $scope.selectedYear,
      days: $scope.days
  	}
  	$scope.ergosima.push(ergosimo);

    resetSelectedMonth();
    resetSelectedYear();
    resetDays();
  }

  $scope.months = [
    'Ιανουάριος',
    'Φεβρουάριος',
    'Μάρτης',
    'Απρίλης',
    'Μάης',
    'Ιούνιος',
    'Ιούλιος',
    'Αύγουστος',
    'Σεπτέμβριος',
    'Οκτώβριος',
    'Νοέμβριος',
    'Δεκέμβριος'
  ];

  $scope.years = [
    '2012',
    '2013',
    '2014'
  ];

  $scope.selectMonth = function(month) {
    $log.log('Selected month ', month);
    $scope.selectedMonth = month;
    $scope.monthDropdownLabel = month;
  }

  $scope.selectYear = function(year) {
    $log.log('Selected year ', year);
    $scope.selectedYear = year;
    $scope.yearDropdownLabel = year;
  }

  var resetSelectedMonth = function() {
    $scope.selectedMonth = null;
    $scope.monthDropdownLabel = 'Επιλέξτε μήνα';
  }

  var resetSelectedYear = function() {
    $scope.selectedYear = null;
    $scope.yearDropdownLabel = 'Επιλέξτε έτος';
  }

  var resetDays = function() {
    $scope.days = null;
  }

  $scope.init();

  });

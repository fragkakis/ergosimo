'use strict';

/**
 * @ngdoc function
 * @name ergosimoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ergosimoApp
 */
angular.module('ergosimoApp').controller('MainCtrl', function ($scope) {

  $scope.init = function() {
    // $log.log('Initing');
    resetDateOfIssue();
    resetDateOfPay();
    resetAmount();
  };

  $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  $scope.ergosima = [
  {
    dateOfIssue: new Date('October 13, 2014 11:13:00'),
    dateOfPay: new Date('October 13, 2014 11:13:00'),
    amount: 100
  },
  {
    dateOfIssue: new Date('September 12, 2014 11:13:00'),
    dateOfPay: new Date('September 12, 2014 11:13:00'),
    amount: 100
  },
  {
    dateOfIssue: new Date('November 14, 2014 11:13:00'),
    dateOfPay: new Date('November 14, 2014 11:13:00'),
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
  	};
  	$scope.ergosima.push(ergosimo);

    resetDateOfIssue();
    resetDateOfPay();
    resetAmount();
  };

  var resetDateOfIssue = function() {
    $scope.dateOfIssue = null;
  };

  var resetDateOfPay = function() {
    $scope.dateOfPay = null;
  };

  var resetAmount = function() {
    $scope.amount = null;
  };

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

  $scope.isFirstOfItsCorrespondingQuarter = function(ergosimo) {

    return $scope.isFirstOfQuarter(ergosimo, getErgosimoYear(ergosimo), $scope.calculateQuarterNumber(ergosimo));    
  };

  var getErgosimoYear = function(ergosimo) {
    return ergosimo.dateOfPay.getFullYear();
  };

  $scope.calculateQuarterNumber = function(ergosimo) {
    return Math.floor(ergosimo.dateOfPay.getMonth()/3);
  };

  $scope.isInQuarter = function(ergosimo, year, quarterNumber) {
    return (ergosimo.dateOfPay.getFullYear() === year && ergosimo.dateOfPay.getMonth() === quarterNumber * 3 + 0) || 
    (ergosimo.dateOfPay.getFullYear() === year && ergosimo.dateOfPay.getMonth() === quarterNumber * 3 + 1) ||
    (ergosimo.dateOfPay.getFullYear() === year && ergosimo.dateOfPay.getMonth() === quarterNumber * 3 + 2);
  };

  $scope.isFirstOfQuarter = function(ergosimo, year, quarterNumber) {

    var firstMonthOfQuarter = quarterNumber * 3;
    var lastMonthOfQuarter = ( ( quarterNumber + 1 ) * 3 ) - 1;

    var quarterErgosima = $scope.ergosima.filter(function(ergosimo) {
      return ergosimo.dateOfPay.getFullYear() === year &&
      ergosimo.dateOfPay.getMonth() >= firstMonthOfQuarter && 
      ergosimo.dateOfPay.getMonth() <= lastMonthOfQuarter;
    });

    // console.log('firstMonthOfQuarter: ' + firstMonthOfQuarter);
    // console.log('lastMonthOfQuarter: ' + lastMonthOfQuarter);
    // console.log('ergosimo.dateOfPay: ' + ergosimo.dateOfPay);

    if(quarterErgosima.length > 0) {
      // sort chronologically  
      quarterErgosima.sort(function(erg1, erg2) {
        
        if (erg1.dateOfPay > erg2.dateOfPay) {
          return 1;
        } else if (erg1.dateOfPay < erg2.dateOfPay) {
          return -1;
        } else {
          return 0;
        }
      });  

      // console.log('ergosimo.dateOfPay.getMonth(): ' + ergosimo.dateOfPay.getMonth());
      // console.log('quarterErgosima[0].dateOfPay: ' + quarterErgosima[0] .dateOfPay)
      
      return quarterErgosima[0].dateOfPay.getTime() === ergosimo.dateOfPay.getTime();  
    } else {
      // this ergosimo is not part of the quarter
      // console.log('There were no ergosima in this quarter');
      return false;
    }
  
  };

  $scope.ergosimaOfItsCorrespondingQuarter = function(ergosimo) {
    return 1;
  };

  $scope.quarterAmount = function(ergosimo) {
    return null;
  };

});

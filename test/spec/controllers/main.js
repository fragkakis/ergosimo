'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('ergosimoApp'));

  beforeEach(module('ergosimoApp', function($provide) {
    // Output messages
    $provide.value('$log', console);
  })); 

  var MainCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    scope.ergosima = [
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


    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of ergosima to the scope', function () {
    expect(scope.ergosima.length).toBe(3);
  });

  it('should increment number of ergosima', function () {
    var num = scope.ergosima.length;
    scope.addErgosimo();
    expect(scope.ergosima.length).toBe(num + 1);
  });


  it('should understand the quarter an ergosimo is in', function () {
    var ergosimo = {
      dateOfIssue: new Date('January 13, 2014 11:13:00'),
      dateOfPay: new Date('January 13, 2014 11:13:00'),
      amount: 100
    };

    expect(scope.isInQuarter(ergosimo, 2014, 0)).toBe(true);
    expect(scope.isInQuarter(ergosimo, 2014, 1)).toBe(false);
    expect(scope.isInQuarter(ergosimo, 2014, 2)).toBe(false);
    expect(scope.isInQuarter(ergosimo, 2014, 3)).toBe(false);
  });


  it('should understand whether an ergosimo is the first in a quarter', function () {
    
    var ergosimoSeptember = {
        dateOfIssue: new Date('September 12, 2014 11:13:00'),
        dateOfPay: new Date('September 12, 2014 11:13:00'),
        amount: 100
      };

    var ergosimoOctober = {
        dateOfIssue: new Date('October 13, 2014 11:13:00'),
        dateOfPay: new Date('October 13, 2014 11:13:00'),
        amount: 100
      };
    
    expect(scope.isFirstOfQuarter(ergosimoSeptember, 2014, 0)).toBe(false);
    expect(scope.isFirstOfQuarter(ergosimoSeptember, 2014, 1)).toBe(false);
    expect(scope.isFirstOfQuarter(ergosimoSeptember, 2014, 2)).toBe(true);
    expect(scope.isFirstOfQuarter(ergosimoSeptember, 2014, 3)).toBe(false);

    expect(scope.isFirstOfQuarter(ergosimoOctober, 2014, 0)).toBe(false);
    expect(scope.isFirstOfQuarter(ergosimoOctober, 2014, 1)).toBe(false);
    expect(scope.isFirstOfQuarter(ergosimoOctober, 2014, 2)).toBe(false);
    expect(scope.isFirstOfQuarter(ergosimoOctober, 2014, 3)).toBe(true);
    
  });

  it('should calculate the quarter number for an ergosimo', function () {
    var ergosimo = {
        dateOfIssue: new Date('January 12, 2014 11:13:00'),
        dateOfPay: new Date('January 12, 2014 11:13:00'),
        amount: 100
      };
      // Jan
      expect(scope.calculateQuarterNumber(ergosimo)).toBe(0);
      // Feb  
      ergosimo.dateOfPay.setMonth(ergosimo.dateOfPay.getMonth() + 1);
      expect(scope.calculateQuarterNumber(ergosimo)).toBe(0);  
      // Mar  
      ergosimo.dateOfPay.setMonth(ergosimo.dateOfPay.getMonth() + 1);
      expect(scope.calculateQuarterNumber(ergosimo)).toBe(0);  
      // Apr
      ergosimo.dateOfPay.setMonth(ergosimo.dateOfPay.getMonth() + 1);
      expect(scope.calculateQuarterNumber(ergosimo)).toBe(1);  
      // May
      ergosimo.dateOfPay.setMonth(ergosimo.dateOfPay.getMonth() + 1);
      expect(scope.calculateQuarterNumber(ergosimo)).toBe(1);  
      // Jun
      ergosimo.dateOfPay.setMonth(ergosimo.dateOfPay.getMonth() + 1);
      expect(scope.calculateQuarterNumber(ergosimo)).toBe(1);  
      // Jul
      ergosimo.dateOfPay.setMonth(ergosimo.dateOfPay.getMonth() + 1);
      expect(scope.calculateQuarterNumber(ergosimo)).toBe(2);  
      // Aug
      ergosimo.dateOfPay.setMonth(ergosimo.dateOfPay.getMonth() + 1);
      expect(scope.calculateQuarterNumber(ergosimo)).toBe(2);  
      // Sep
      ergosimo.dateOfPay.setMonth(ergosimo.dateOfPay.getMonth() + 1);
      expect(scope.calculateQuarterNumber(ergosimo)).toBe(2);  
      // Ocr
      ergosimo.dateOfPay.setMonth(ergosimo.dateOfPay.getMonth() + 1);
      expect(scope.calculateQuarterNumber(ergosimo)).toBe(3);  
      // Nov
      ergosimo.dateOfPay.setMonth(ergosimo.dateOfPay.getMonth() + 1);
      expect(scope.calculateQuarterNumber(ergosimo)).toBe(3);  
      // Dec
      ergosimo.dateOfPay.setMonth(ergosimo.dateOfPay.getMonth() + 1);
      expect(scope.calculateQuarterNumber(ergosimo)).toBe(3);  
    });
});

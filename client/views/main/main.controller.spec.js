'use strict';

//=== Testing mainCtrl =============================================
describe('Testing controller: mainCtrl', function(){

    // load the controller's module
    beforeEach(module('appModule'));

    var mainCtrl, scope;

    // Initialize the controller and mock scope.
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        mainCtrl = $controller('mainCtrl', {
            $scope: scope
        });
    }));

    it('dummy test should pass', function(){
        expect(true).toEqual(true);
    });

    it('testing heaviest on empty array', function(){
        var arrayOfPets = [];
        expect(scope.heaviest(arrayOfPets)).toEqual({name: "Absent", weight: -1});
    });

    it('testing heaviest', function(){
        var arrayOfPets = [{name: "jerry", weight: 4}, {name: "tom", weight: 7}];
        expect(scope.heaviest(arrayOfPets)).toEqual({name: "tom", weight: 7});
    });

    it('testing heaviest', function(){
        var arrayOfPets = [{name: "jerry", weight: 4}, {name: "tom", weight: 4}];
        expect(scope.heaviest(arrayOfPets)).toEqual({name: "jerry", weight: 4});
    });


});

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

    it("should be able to add a pet to the database", function(){
        var initialLength = scope.data.length;
        scope.data=[{name: "horse", weight: 198}];
        scope.addData();
        expect(scope.data.length > initialLength).toEqual(true);
    });

    it('should be able to remove a pet to the database', function(){
        scope.data=[{name: "goat", weight: 46},
            {name: "cow", weight: 156},
            {name: "mouse", weight: 0.5}];
        var initialLength = scope.data.length;
        scope.removeData(0);
        expect(scope.data.length < initialLength);
    });

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

'use strict';

//=== Testing mainCtrl =============================================
describe('Testing controller: gpaCtrl', function(){

    // load the controller's module
    beforeEach(module('appModule'));

    var gpaCtrl, scope;

    // Initialize the controller and mock scope.
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        gpaCtrl = $controller('gpaCtrl', {
            $scope: scope
        });
    }));

    it('dummy test should pass', function(){
        expect(true).toEqual(true);
    });

    //====Testing GPA Functions=======================================
    describe('Testing GPA Functions: gpaCtrl', function(){

        beforeEach(module('mainApp'));

        var gpaCtrl, scope;

        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            gpaCtrl = $controller('gpaCtrl', {
                $scope: scope
            });
        }));

//        it('should send an error', function(){
//            scope.credits = "fred";
//            expect(scope.addGpaData()).toEqual(alert("THIS IS NOT A VALID GRADE!"))
//        });
//
//        it('should send an error', function(){
//            scope.textFields.Field3= "george";
//            expect(scope.addGpaData()).toEqual(alert("THIS IS NOT A VALID CREDIT VALUE!"))
//        });
//
//        it('should send an error', function(){
//            scope.credits = 7;
//            expect(scope.addGpaData()).toEqual(alert("THIS IS NOT A VALID GRADE!"))
//        });

        it('should equal 4', function(){
            scope.gpaData=({class: "test class", credit: 5,  grade: "A"})
            expect(scope.calculateGpa()).toEqual(4);
        });

        it('should equal red', function(){
            scope.gpaData=({class: "test class", credit: 5, grade: "F" })
            expect(scope.colorGpa()).toEqual({"color":"Red"});
        });

    })
});

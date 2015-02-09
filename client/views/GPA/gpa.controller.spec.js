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

        describe('testing letterToNum', function() {
            it('should return 4.0 for A', function () {
                expect(scope.letterToNum("A")).toEqual(4.0);
                expect(scope.letterToNum("a")).toEqual(4.0);
            });

            it('should return 3.0 for B', function () {
                expect(scope.letterToNum("B")).toEqual(3.0);
                expect(scope.letterToNum("b")).toEqual(3.0);
            });

            it('should return 2.0 for C', function () {
                expect(scope.letterToNum("C")).toEqual(2.0);
                expect(scope.letterToNum("c")).toEqual(2.0);
            });

            it('should return 1.0 for D', function () {
                expect(scope.letterToNum("D")).toEqual(1.0);
                expect(scope.letterToNum("d")).toEqual(1.0);
            });

            it('should return 0.0 for D', function () {
                expect(scope.letterToNum("F")).toEqual(0.0);
                expect(scope.letterToNum("f")).toEqual(0.0);
            });
        });

        describe('testing calculateGpa', function() {
            it('should equal 0 for empty dataGpa', function(){
                scope.gpaData=[];
                expect(scope.calculateGpa()).toEqual(0);
            });

            it('should equal 4', function(){
                scope.gpaData=[{courseName: "test class", credits: 5,  letterGrade: "A"}];
                expect(scope.calculateGpa()).toEqual(4);
            });

            it('should equal 3', function(){
                scope.gpaData=[{courseName: "test class", credits: 5,  letterGrade: "A"},
                                {courseName: "test class", credits: 5,  letterGrade: "c"}];
                expect(scope.calculateGpa()).toEqual(3);
            });

            it('should equal 0', function(){
                scope.gpaData=[{courseName: "test class", credits: 4,  letterGrade: "f"}];
                expect(scope.calculateGpa()).toEqual(0);
            });

            it('should equal 3', function(){
                scope.gpaData=[{courseName: "test class", credits: 5,  letterGrade: "C"},
                                {courseName: "test class", credits: 3,  letterGrade: "b"}];
                expect(scope.calculateGpa()).toEqual(2.375);
            });
        });

        describe('testing addClass and removeClass', function() {
            it("should be able to add a class to the database", function(){
                var initialLength = scope.gpaData.length;
                scope.gpaData=[{courseName: "Calc", credits: 3,  letterGrade: "d"}];
                scope.addClass();
                expect(scope.gpaData.length > initialLength).toEqual(true);
            });

            it('should be able to remove a class to the database', function(){
                scope.gpaData=[{courseName: "psychology", credits: 5,  letterGrade: "C"},
                    {courseName: "physics", credits: 1,  letterGrade: "a"},
                    {courseName: "math", credits: 2,  letterGrade: "f"},
                    {courseName: "calc", credits: 5,  letterGrade: "a"}];
                var initialLength = scope.gpaData.length;
                scope.removeClass(1);
                expect(scope.gpaData.length < initialLength);
            });
        });

        describe('testing colorGpa', function() {
            it("testing gpaColorPicker", function(){
                var highGpa = 3.6;
                expect(scope.colorGpa(highGpa)).toBe("excellent");
                var midGpa = 2.0;
                expect(scope.colorGpa(midGpa)).toBe("good");
                var lowGpa = 1.0;
                expect(scope.colorGpa(lowGpa)).toBe("problematic");
            });
        });
    });
});

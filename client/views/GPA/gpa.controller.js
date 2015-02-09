'use strict';

angular.module("appModule")
    .controller('gpaCtrl', function($scope, $http){
        console.log("gpa controller loaded!");

        $scope.courseName = "";
        $scope.credits = "";
        $scope.letterGrade = "";

        // Normally, data like this would be stored in a database, and this controller would issue an http:get request for it.
        $scope.gpaData = [];

        $scope.getPets = function(){
            $http.get('api/pets').success(function(pets) {
                $scope.gpaData = pets;
            });
        };

        $scope.addClass = function(){
            if($scope.courseName.length >= 1 && $scope.credits >= 1 && $scope.letterGrade.length >= 1 ) {
                $http.post('api/pets', {courseName: $scope.courseName, credits: $scope.credits, letterGrade: $scope.letterGrade}).success(function(){
                    $scope.getPets();
                });
                $scope.courseName = "";
                $scope.credits = 0;
                $scope.letterGrade = "";
            }
        };

        $scope.removeClass = function(index){
            $http.delete('/api/pets/' + $scope.gpaData[index]._id).success(function(){
                $scope.getPets();
            });
        };

        $scope.letterToNum = function(letter){
            console.log(letter);
            letter = letter.toUpperCase();
            switch(letter) {
                case "A":
                    return 4.0;
                case "B":
                    return 3.0;
                case "C":
                    return 2.0;
                case "D":
                    return 1.0;
                default:
                    return 0.0;
            }
        };

        $scope.calculateGpa = function(){
            if($scope.gpaData.length == 0){
                return 0;
            }
            var creditByGrade = 0;
            var totalCredits = 0;
            for(var i = 0; i< $scope.gpaData.length;i++){
                totalCredits += $scope.gpaData[i].credits;
                creditByGrade += ($scope.gpaData[i].credits * $scope.letterToNum($scope.gpaData[i].letterGrade));
            }
             return creditByGrade / totalCredits;
        };

        //Adds color to the Gpa calculator
        $scope.colorGpa = function(gpa){
            if(gpa >= 3.0){
                return "excellent";
            }else if(gpa >= 2.0){
                return "good";
            }else if (gpa < 2.0){
                return "problematic";
            }
        };
    });
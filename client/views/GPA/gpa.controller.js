'use strict';

angular.module("appModule")
    .controller('gpaCtrl', function($scope, $http){
        console.log("gpa controller loaded!");

        $scope.courseName = "";
        $scope.credits = "";
        $scope.letterGrade = "";
        $scope.totalGpa = {courseName: "SoftWare D", credits: 5, letterGrade: "A"};

        // Normally, data like this would be stored in a database, and this controller would issue an http:get request for it.
        $scope.gpaData = [];

        $scope.getPets = function(){
            $http.get('api/pets').success(function(pets) {
                $scope.gpaData = pets;
                $scope.totalGpa = $scope.calculateGpa($scope.gpaData);
            });
        };

        $scope.addClass = function(){
            if($scope.courseName.length >= 1 && $scope.credits >= 0 && $scope.letterGrade.length >= 1 ) {
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

        $scope.itemsInList = function(){
            return $scope.gpaData.length;
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
            var grade = "markUp";
            if($scope.gpaData.length == 0){
                return 0;
            }
            var totalScore = 0;
            var totalCredits = 0;
            for (var i = 0; i < $scope.gpaData.length; i++){
                grade = $scope.gpaData[i].letterGrade;
                var credit = Number($scope.gpaData[i].credits);
                console.log(grade);
                var gradeNumber = $scope.letterToNum(grade);
                totalScore += credit*gradeNumber;
                totalCredits += credit;
            }
            return (totalScore/totalCredits);
        }

    });
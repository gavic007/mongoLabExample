'use strict';

angular.module("appModule")
    .controller('mainCtrl', function($scope, $http){
        console.log("main controller loaded!");

        $scope.name = "";
        $scope.weight = "";

        // Normally, data like this would be stored in a database, and this controller would issue an http:get request for it.
        $scope.data = [];

        $scope.getPets = function(){
            $http.get('api/pets').success(function(pets) {
                $scope.data = pets;
            });
        };

        $scope.getPets();

        $scope.addData = function(){
            if($scope.name.length >= 1 && $scope.weight.length >= 1) {
                $http.post('api/pets', {name: $scope.name, weight: $scope.weight}).success(function(){
                    $scope.getPets();
                });
                $scope.name = "";
                $scope.weight = "";
            }
        };

        $scope.removeData = function(index){
            $http.delete('/api/pets/' + $scope.data[index]._id).success(function(){
                $scope.getPets();
            });
        };

        $scope.cat = function(str1, str2){
            return str1 + str2;
        };

        $scope.itemsInList = function(){
            return $scope.data.length;
        };

        $scope.heaviest = function() {
            var heavy = 0;

            if ($scope.data.length > 0){
                var heavy = $scope.data[0].weight;
            }

            console.log("weight:");

            return heavy;
        }
    });
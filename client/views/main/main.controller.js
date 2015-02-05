'use strict';

angular.module("appModule")
    .controller('mainCtrl', function($scope, $http){
        console.log("main controller loaded!");

        $scope.name = "";
        $scope.weight = "";
        $scope.heaviestPet = {name: "Absent", weight: -1};

        // Normally, data like this would be stored in a database, and this controller would issue an http:get request for it.
        $scope.data = [];

        $scope.getPets = function(){
            $http.get('api/pets').success(function(pets) {
                $scope.data = pets;
                $scope.heaviestPet = $scope.heaviest($scope.data);
            });
        };

//        $scope.getPets();

        $scope.addData = function(){
            if($scope.name.length >= 1 && $scope.weight > 0) {
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

        $scope.weightIndex = 0;
        $scope.heaviest = function(arrayOfPets) {
            var heavy = {name: "Absent", weight: -1};
            for(var i = 0; i < arrayOfPets.length; i++) {
                if (heavy.weight < arrayOfPets[i].weight) {
                    heavy = arrayOfPets[i];
                }
            }
//            if ($scope.data.length > 0){
//                heavy = $scope.data[0].weight;
//                for (var j = 0; j < $scope.data.length; j++) {
//                    if (heavy < $scope.data[j].weight) {
//                        heavy = $scope.data[j].weight;
//                        $scope.weightIndex = j;
//                    }
//                }
//            }
            return heavy;
        }

        $scope.getName = function() {
            return $scope.data[$scope.weightIndex].name;
        }
    });
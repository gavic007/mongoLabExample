'use strict';

console.log("gpa.js loaded!");

angular.module("appModule")
    .config(function($stateProvider){
        $stateProvider
            .state('gpa', {
                url: '/gpa',
                templateUrl: 'views/GPA/gpa.html',
                controller: 'gpaCtrl'
            });
    });

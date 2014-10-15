var admin = false;
var environment = '';
var firebasetorch = '';
var data_array;
var data_object;
var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'firebase', 'flow', 'pdf']);


app.controller('appCtrl', ['$scope', '$rootScope', '$window', '$state', '$firebase',
    function($scope, $rootScope, $window, $state, $firebase) {

        /**
         * check if current user is admin
         * @return {[type]}
         */
        $scope.isadmin = function() {
            return admin;
        }

        /**
         * log user out
         * @return {[type]} [description]
         */
        $scope.logout = function() {

            authClient.logout();
            $rootScope.user = 0;

        };



    }
]);
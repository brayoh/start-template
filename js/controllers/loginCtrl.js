app.controller('loginCtrl', ['$scope', '$state', '$rootScope', '$firebase',
    function($scope, $state, $rootScope, $firebase) {
        //initially set those objects to null to avoid undefined error
        $scope.login = {};
        $scope.doLogin = function(logindata) {

            authClient.login('password', {
                email: logindata.email,
                password: logindata.password
            });

            $state.go('login');

        };

    }
]);
app.config(['$urlRouterProvider', '$stateProvider',
    function($urlRouterProvider, $stateProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('page1', {
                url: '/',
                templateUrl: 'partials/page1.html',
                controller: 'page1Ctrl',
                resolve: {}
            })
            .state('login', {
                url: '/login',
                templateUrl: 'partials/login.html',
                controller: 'loginCtrl',
                resolve: {}
            })

    }
]);

app.config(['flowFactoryProvider',
    function(flowFactoryProvider, $rootScope) {
        flowFactoryProvider.defaults = {
            target: 'upload.php',
            permanentErrors: [404, 500, 501],
            maxChunkRetries: 1,
            chunkRetryInterval: 5000,
            simultaneousUploads: 4
        };
        flowFactoryProvider.on('catchAll', function(event) {
            console.log('catchAll', arguments);

        });
        // Can be used with different implementations of Flow.js
        // flowFactoryProvider.factory = fustyFlowFactory;
    }
]);

app.filter('percentage', ['$filter',
    function($filter) {
        return function(input, decimals) {
            return $filter('number')(input * 100, decimals) + '%';
        };
    }
]);

app.run(['$rootScope', '$state', '$firebase',

    function($rootScope, $state, $firebase) {
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            // $rootScope.appear = 'animate';
            // if (!data_object || !data_array) {

            //     data_object = new Firebase(firebasetorch + environment + "/data_object");
            //     $rootScope.data_object = $firebase(data_object).$asObject();

            //     data_array = new Firebase(firebasetorch + environment + "/data_array");
            //     $rootScope.data_array = $firebase(data_array).$asArray();

            // }
            // if (!$rootScope.user) {
            //     authClient = new FirebaseSimpleLogin(pgref, function(error, user) {
            //         if (error) {
            //             // an error occurred while attempting login
            //             $rootScope.user = 0;
            //             console.log(error);

            //         } else if (user) {
            //             // user authenticated with Firebase
            //             console.log(user.email.split('@')[0] + " logged in");
            //             $rootScope.data_object = $firebase(data_object).$asObject();
            //             $rootScope.user = user.email.split('@')[0];
            //             if ($rootScope.user == 'jov2all') {
            //                 admin = true;
            //             }

            //         } else {
            //             // user is logged out
            //             console.log("not authenticated");
            //             $rootScope.user = 0;
            //             $state.go('login');

            //         }
            //     });
            // }

        });
    }
]);
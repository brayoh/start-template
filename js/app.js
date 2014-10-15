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





/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/

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





/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/

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





/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/

app.controller('page1Ctrl', ['$scope', '$stateParams', '$state', '$rootScope', '$firebase',
    function($scope, $stateParams, $state, $rootScope, $firebase) {


    }
]);





/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/

/*! Angular-PDF Version: 0.3.3 | (C) Sayanee Basu 2014, released under an MIT license */
(function() {

    'use strict';

    angular.module('pdf', []).directive('ngPdf', function($window) {
        return {
            restrict: 'E',
            templateUrl: function(element, attr) {
                return attr.templateUrl ? attr.templateUrl : 'partials/viewer/pdf.html'
            },
            link: function(scope, element, attrs) {
                var url = scope.pdfUrl,
                    pdfDoc = null,
                    pageNum = 1,
                    scale = (attrs.scale ? attrs.scale : 1),
                    canvas = (attrs.canvasid ? document.getElementById(attrs.canvasid) : document.getElementById('pdf-canvas')),
                    ctx = canvas.getContext('2d'),
                    windowEl = angular.element($window);

                windowEl.on('scroll', function() {
                    scope.$apply(function() {
                        scope.scroll = windowEl[0].scrollY;
                    });
                });

                PDFJS.disableWorker = true;
                scope.pageNum = pageNum;

                scope.renderPage = function(num) {

                    pdfDoc.getPage(num).then(function(page) {
                        var viewport = page.getViewport(scale),
                            renderContext = {};

                        canvas.height = viewport.height;
                        canvas.width = viewport.width;

                        renderContext = {
                            canvasContext: ctx,
                            viewport: viewport
                        };

                        page.render(renderContext);
                    });

                };

                scope.goPrevious = function() {
                    if (scope.pageToDisplay <= 1) {
                        return;
                    }
                    scope.pageToDisplay = scope.pageToDisplay - 1;
                    scope.renderPage(scope.pageToDisplay);
                };

                scope.goNext = function() {
                    if (scope.pageToDisplay >= pdfDoc.numPages) {
                        return;
                    }
                    scope.pageToDisplay = scope.pageToDisplay + 1;
                    scope.renderPage(scope.pageToDisplay);
                };

                scope.zoomIn = function() {
                    scale = parseFloat(scale) + 0.2;
                    scope.renderPage(scope.pageToDisplay);
                    return scale;
                };

                scope.zoomOut = function() {
                    scale = parseFloat(scale) - 0.2;
                    scope.renderPage(scope.pageToDisplay);
                    return scale;
                };

                scope.changePage = function() {
                    scope.renderPage(scope.pageToDisplay);
                };

                scope.rotate = function() {
                    if (canvas.getAttribute('class') === 'rotate0') {
                        canvas.setAttribute('class', 'rotate90');
                    } else if (canvas.getAttribute('class') === 'rotate90') {
                        canvas.setAttribute('class', 'rotate180');
                    } else if (canvas.getAttribute('class') === 'rotate180') {
                        canvas.setAttribute('class', 'rotate270');
                    } else {
                        canvas.setAttribute('class', 'rotate0');
                    }
                };

                PDFJS.getDocument(url).then(function(_pdfDoc) {
                    pdfDoc = _pdfDoc;
                    scope.renderPage(scope.pageToDisplay);

                    scope.$apply(function() {
                        scope.pageCount = _pdfDoc.numPages;
                    });
                });

                scope.$watch('pageNum', function(newVal) {
                    scope.pageToDisplay = parseInt(newVal);
                    if (pdfDoc !== null) {
                        scope.renderPage(scope.pageToDisplay);
                    }
                });

            }
        };
    });

})();





/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/

app.directive('draggable', function($document) {
    return function(scope, element, attr) {
        var startX = 0,
            startY = 0,
            x = 0,
            y = 0;
        element.css({
            position: 'relative',
            backgroundColor: 'lightgrey',

        });
        element.on('mousedown', function(event) {
            // Prevent default dragging of selected content

            startX = event.screenX - x;
            startY = event.screenY - y;
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
        });

        function mousemove(event) {
            y = event.screenY - startY;
            x = event.screenX - startX;
            element.css({
                top: y + 'px',
                left: x + 'px'
            });
        }

        function mouseup() {
            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);
        }
    };
});





/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/

app.directive('slideable', function() {
    return {
        restrict: 'C',
        compile: function(element, attr) {
            // wrap tag
            var contents = element.html();
            element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

            return function postLink(scope, element, attrs) {
                // default properties
                attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
                attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                element.css({
                    'overflow': 'hidden',
                    'height': '0px',
                    'transitionProperty': 'height',
                    'transitionDuration': attrs.duration,
                    'transitionTimingFunction': attrs.easing
                });
            };
        }
    };
})
app.directive('slideToggle', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var target = document.querySelector(attrs.slideToggle);
            attrs.expanded = false;
            element.bind('click', function() {
                var content = target.querySelector('.slideable_content');
                if (!attrs.expanded) {
                    content.style.border = '1px solid rgba(0,0,0,0)';
                    var y = content.clientHeight;
                    content.style.border = 0;
                    target.style.height = y + 'px';
                } else {
                    target.style.height = '0px';
                }
                attrs.expanded = !attrs.expanded;
            });
        }
    }
});
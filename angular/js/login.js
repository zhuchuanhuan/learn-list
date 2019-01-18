'use strict';
(function () {

    function loginController($scope, $http, $cookieStore, $location) {

        var error_code = $location.absUrl().split('=')[1];
        if (error_code == 'expired') {
            $scope.error_msg = '会话已过期';
        }
        if (error_code == 'invalid') {
            $scope.error_msg = '登录失败';
        }

        //var token = $cookieStore.get('token'), username = $cookieStore.get('username');
        //if ( token && username) {
        //    $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode(username
        //+ ":" + token);
        //    $http.get('/api/datacenters').success(function (data) {
        //        window.location.href = 'index.html';
        //    }).error(function (e, code) {
        //        if (code == 401) {
        //            $scope.error_msg = '会话已过期';
        //        }
        //    })
        //
        //}
        $http.get("/api/global_info").success(function(data){
            $scope.global = data;
        })
        $scope.do_login = function () {
            if ($scope.username == null || (/^\s*$/).test($scope.username)) {
                $scope.error_msg = '用户名不能为空';
                return;
            }

            if ($scope.password == null || (/^\s*$/).test($scope.password)) {
                $scope.error_msg = '密码不能为空';
                return;
            }

            $http.get("/api/login", {headers: {Authorization: "Basic " + Base64.encode($scope.username + ":" + $scope.password)}})
                .success(function (data) {
                    if (data.token) {
                        $cookieStore.put('token', escape(data.token));
                        $cookieStore.put('username', $scope.username);
                        window.location.href = 'index.html#/';
                    }

                }).error(function (e) {
                $scope.error_msg = '用户名或密码错误';
            });



        }

    }

    function logoutController($rootScope, $scope, Logout, $cookieStore) {
        $scope.do_logout = function () {
            $cookieStore.remove('token');
            window.location.href = "/static/app/login.html";
        }

        $scope.admin = $cookieStore.get('username');

        $rootScope.runactivity = true;
        $scope.toggleactivity = function () {
            $rootScope.runactivity = !$rootScope.runactivity;
        }

    }

//used by login.html standalone ,so we do not use angular resource
    angular.module('cvirt.login', ['ngCookies'])
        .controller('loginController', loginController)
        .controller('logoutController', logoutController);
})();
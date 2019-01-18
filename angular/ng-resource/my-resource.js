(function () {
    'use strict'
    angular.module('myModule')
        .factory('api', api)
        .controller('AboutController', AboutController)


    function api($resource, baseUrl) {
        var actions = {//自定义方法的集合
            "list": {method: "GET", url: baseUrl + "/api/usbs"},
            "create": {method: "POST", url: baseUrl + "/api/usbs/create_usb"},
            "edit": {method: "POST", params: {action: "edit_usb"}},
            "setup": {method: "POST", url: baseUrl + "/api/usbs/setup_usb"},
            "delete": {method: "POST", url: baseUrl + "/api/usbs/delete_usb"},
            "import": {method: "POST", url: baseUrl + "/api/usbs/delete_usb"},
            "groupList": {method: "GET", url: baseUrl + "/api/usbs/group_list"},
            "createGroup": {method: "POST", url: baseUrl + "/api/usbs/create_group"},//这边添加url会取代resource里面的url
            "editGroup": {method: "POST", params: {action: "edit_group"}},
            "deleteGroup": {method: "POST", params: {action: "delete_group"}}
        };

        var resource = $resource(baseUrl + "/api/usb/:id/:action", {id: '@id'}, actions);//第一个参数有地址加不同的方法参数组成，
                                                                                         //第二个参数是访问地址时添加的参数
        // 第三个参数自定义方法
        return TokenHandler.wrapActions(resource, Object.keys(actions))
    }

    function AboutController($scope,baseUrl,api) {
        api.deleteGroup({id:'1234'},{},function(resp){//第一个参数给请求地址id添加参数，第二个是请求数据为空，
            //success
        },function(error){
            //fail
        });
    }
})()
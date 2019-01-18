angular.module('myModule1', ['ng', 'ngRoute', 'ngAnimate'])
    .controller('parentCtrl', function ($scope, $location) {//在所有页面都需要同一个事件函数时，在body里面添加controller
        $scope.jump = function (routeUrl) {//利用函数传实参的方式也可以实现页面跳转
            $location.path(routeUrl);//修改地址路由地址部分
        }
    })
    .controller('Cstart', function ($scope, $http, $location) {
        // $scope.jump=function () {
        //     $location.path('/detail')//修改地址栏中路由地址部分
        // }
        // $scope.jump=function (touteUrl) {//利用函数传实参的方式也可以实现页面跳转
        //     $location.path(touteUrl)//修改地址栏中路由地址部分
        // }

        $scope.hasmore=true;//显示隐藏按钮和提示

        $scope.dishlist = [];
        $http.get('data/dish_listbypage.php?start=0')
            .success(function (data) {
            $scope.dishlist = $scope.dishlist.concat(data)//concat合并两个数组给新数组
        });
        //点击加载更多按钮事件处理函数；
        $scope.loadmore = function () {
            $http.get('data/dish_listbypage.php?start=' +$scope.dishlisti.length)
                .success(function (data) {
                    if (data.length < 5) {//成功加载5条数据过来，当小于5个时，说明没有更多数据可加载了
                        $scope.hasmore = false;//可以隐藏加载更多的按钮
                    }
                        $scope.dishlist = $scope.dishlist.concat(data)

               })
        }

        //搜索按钮监听事件
        $scope.$watch('kw',function () {
            if($scope.kw){
                $http.get('data/dish_listbykw.php?kw='+$scope.kw)
                    .success(function (data) {
                        $scope.dishlist=data;//直接改变dishlist不需要组合数组了,把列表里面的内容都换掉
                    })
            }
        })

        $scope.msg = 'zhuchuanhuan'
    })
    .controller('Cdetail', function ($scope, $http, $routeParams) {// $routeParams:读取start页面过来的参数，//需要上个页面传来参数下单的哪个菜
        console.log($routeParams)
        $http.get('data/dish>listbydid.php?did=' + $routeParams.did)//每个菜的详情不一样，根据start传来的参数发送服务器请求
            .success(function (data) {
                console.log(data)//拿到了第did个菜的详情
                $scope.dish=data[0]//data里面只有一个数据所以length等于0个
                $scope.dish = {did: $routeParams.did};
            })
        $scope.msg = 'ZCHZWS'
    })
    .controller('Cmain', function ($scope,$routeParams,$http) {
        $scope.submitorder=function () {
            $scope.order = {did: $routeParams.did};//往发送的数组对象order里面添加did：1或者did：2
            // $http.get('data/order_add.php?did=5&phone=123-&user_name=zhuan&adde=wuxi')
            var str=jQuery.param($scope.order);//jQuery的param方法可以把key：value这样的对象转换成字符串
            $http.get('data/order_add.php?'+str)
                .success()
            $http.post('data/order_add.php?',str)//angularJS默认设置请求消息头部header：content-Type:application/json;json格式不符合HTTP协议规定的请求主体数据格式！
                .success()
            //http协议的请求request数据只能是以下三种格式之一，响应格式不限制
                //1.text/plain
                // 请求数据是普通文本，未经过任何编码操作
                // 例如：did=4&user_name=大旭&addr=大钟寺1&2号/有两个问题,一中文没有编码,服务器完全不认识;二键值得分隔符&被占用
                //2.application/x-www-form-urlencoded
                //form元素的enctype属性的默认值，数据提交之前会被浏览器编码
                // 例如did=4&user_name=%E5%A4%E6%97%AD&addr=......一般web服务器都能接收客服端提交的编码后的请求数据，并自动进行解码
                //3.multiplart/form-data
                //专用于表单中存在上传文件的情形
                //<form action='' method="post" enctype=三种格式之一>
        }
        $scope.msg = 'zhangwensu'
        $scope.datat=[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:1548, name:'搜索引擎'}
        ]
        var myChart = echarts.init(document.getElementById('main'));
        option = {
            title : {
                text: '某站点用户访问来源',
                subtext: '纯属虚构',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:$scope.datat,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        myChart.setOption(option);

    })
    .config(function ($routeProvider) {//调用module。config()方法
        $routeProvider.when('/start', {
            templateUrl: 'tpl/start.html',//页面地址
            controller: 'Cstart'//这边为模板页面配置控制器，相当于在div里声明指令ng-controller
        }).when('/main', {
            templateUrl: 'tpl/main.html',
            controller: 'Cmain'
        }).when('/detail/:did', {//这里用一个变量接住URL的参数就是那个表达式的值，这个变量名不需要和url参数名一样；变量名前面加一个冒号
            templateUrl: 'tpl/detail.html',
            controller: 'Cdetail'
        }).otherwise({//若URL中未提供路由地址或提供了不存在的路由地址,定向给个URL地址
            redirectTo: '/start',
        })
    })
.run(function ($http) {//设置$http.post请求的默认设置头部
    $http.defaults.headers.post={
        'Content-Type':'application/x-www-form-urlencoded'}
})
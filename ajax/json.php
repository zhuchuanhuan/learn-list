<?php
//接受的是字符串
$user= $_POST['user'];
echo $user;
//解析字符串变成数组
//$json_user=json_decode($user,true);
//var_dump($json_user);
//封装php变量（array）转换成符合json格式的数据--字符串
//echo $json_encode($json_user);
//echo '{"name":"zhuchuanhuan","pwd":"123456"}';
?>
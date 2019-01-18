<?php
$user=$_POST['user'];
//echo $use.'succes';
//创建DOMdocument对象
 $doc = new DOMDocument();
 $result=$doc->loadXML($user);
 //$doc->saveXML();
 //var_dump($result);
 //构建响应头
 header('Content-Type:text/xml');
 echo $user;
?>
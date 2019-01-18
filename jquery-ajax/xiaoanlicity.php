<?php
$province=$_POST['province'];
switch($province){
	case '山东省':$ctities= '["济南市","日照市","德州市"]';
	break;
	case '辽宁省':$ctities= '["沈阳市","日照市","德州市"]';
	break;
	};
	echo $ctities;

?>
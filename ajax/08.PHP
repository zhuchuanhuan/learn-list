<?php
	  $pro=$_POST['povcince'];
	  //向客服端相应的数据-XML格式
	  header('Content-Type:text/xml');
	  
	  switch($pro){
		case '山东省':
			echo '<cities><city>济南市</city><city>日照市</city><city>德州市</city></cities>';
		break;
		case '辽宁省':
			echo '<cities><city>济南市</city><city>日照市</city><city>德州市</city></cities>';
		break;
				  }

?>

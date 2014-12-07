<?php
	# db connection php
// Eye-Tracker Project Web Platform
//
// Author: KyeongPil Kang
// Creation date: 2014/10/24
//
// © Team Confidence
//
// Modification history
// Version 	Modifier    	Date 		Change Reason
// 1.0.1 	KyeongPil Kang 2014/11/05 	Add header line
	header('Content-Type: text/html; charset=utf-8');

  define('DB_HOST', 'localhost');
  define('DB_NAME', 'moamoa');
  define('DB_USER','moamoa'); 
  define('DB_PASSWORD','koreauniv1');

  $connect = $mysqli=new mysqli(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
    mysqli_query($connect,"SET NAMES 'utf8'");
  if (mysqli_connect_error()) {
    exit('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
  }

?>
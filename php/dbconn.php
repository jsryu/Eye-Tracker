<?php

  define('DB_HOST', 'localhost');
  define('DB_NAME', 'moamoa');
  define('DB_USER','moamoa'); 
  define('DB_PASSWORD','koreauniv1');

  $connect = $mysqli=new mysqli(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
    mysqli_query($connect,"set names utf8");
  if (mysqli_connect_error()) {
    exit('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
  }

?>
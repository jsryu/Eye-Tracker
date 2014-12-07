<?php
	# get all contents information from server
header('Content-Type: text/html; charset=utf-8');
  include "dbconn.php";

  $mysqli=new mysqli(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
  if (mysqli_connect_error()) {
    exit('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
  }

    $query = "SELECT * FROM contents";
    $result=$mysqli->query($query);

    $row=$result->fetch_array(MYSQLI_ASSOC);
    
    while($row=$result->fetch_array(MYSQLI_ASSOC))
    {
        $rows[] = $row;
    }

    echo json_encode($rows);

    $result->free();
    $mysqli->close();

?>
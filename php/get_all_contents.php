<?php
// Eye-Tracker Project Web Platform
//
// Author: Kyungmi Kim
// Creation date: 2014/12/4
//
// © Team Confidence
//
// Modification history
// Version  Modifier        Date        Change Reason
// 1.0.1    Kyungmi Kim     2014/12/04  get information without hardware(eye-tracker)
// 1.0.2    Kyeongpil Kang  2014/12/07  delete dublicated mysql connect
	# get all contents information from server
header('Content-Type: text/html; charset=utf-8');
  include "dbconn.php";

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
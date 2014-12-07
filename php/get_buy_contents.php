<?php
// Eye-Tracker Project Web Platform
//
// Author: Kyungmi Kim
// Creation date: 2014/12/4
//
// © Team Confidence
//
// Modification history
// Version 	Modifier 	   Date 		Change Reason
// 1.0.1	Kyungmi Kim    2014/12/05 	return empty array when user don't buy any contents
// 1.0.2	Kyeongpil Kang 2014/12/06 	add prevent duplication

	#get all information of contents which user bought.
	session_start();

	include "dbconn.php";

	$uid=$_SESSION['uid'];
	$query = "SELECT cid FROM user_contents_info WHERE uid='$uid'";
	$result=$mysqli->query($query);
	$rows=Array();

	while($row=$result->fetch_array(MYSQLI_ASSOC)){

		if($row["cid"]!=1)
			$cid=$row["cid"];
		else
			continue;

		$q = "SELECT * FROM contents WHERE cid='$cid'";
		$res = $mysqli->query($q);
		$contents_row=$res->fetch_array(MYSQLI_ASSOC);

		$rows[]=$contents_row;

		$res->free();
	}
	
	echo json_encode($rows);

	$result->free();
	$mysqli->close();
?>
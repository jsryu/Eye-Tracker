<?php

	include "dbconn.php";

	$uid=$_SESSION['uid'];
	$query = "SELECT * FROM user_contents_info WHERE uid='$uid'";
	$result=$mysqli->query($query);

	$row=$result->fetch_array(MYSQLI_NUM);
	$row_cnt = $result->num_rows;

	$return_arr['contents_cnt']=$row_cnt;
	echo json_encode($return_arr);

	$result->free();
	$mysqli->close();
?>
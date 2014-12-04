<?php
	session_start();

	include "dbconn.php";

	$uid=$_SESSION['uid'];
	$query = "SELECT cid FROM user_contents_info WHERE uid='$uid'";
	$result=$mysqli->query($query);

	while($row=$result->fetch_array(MYSQLI_ASSOC)){
		$cid=$row["cid"];
		$q = "SELECT * FROM contents WHERE cid='$cid'";
		$res = $mysqli->query($q);
		$contents_row=$res->fetch_array(MYSQLI_ASSOC);

		$rows[]=$contents_row;

		$res->free();
	}
	
	if(is_null($rows)) echo json_encode(Array());
	else echo json_encode($rows);

	$result->free();
	$mysqli->close();
?>
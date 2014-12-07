<?php
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
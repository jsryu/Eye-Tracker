<?php
/**
 * Created by PhpStorm.
 * User: Helianthus
 * Date: 14. 12. 4.
 * Time: 오후 3:17
 */
	session_start();
	include_once "dbconn.php";
	$uid = $_SESSION['uid'];
	$purchaseType = $_POST['purchaseType'];
	if($purchaseType =="hardware")
	{
		$query = "INSERT INTO user_contents_info(uid,cid,isDownloaded) VALUES('$uid',1,0)";
		$result = $mysqli->query($query);
		if($result==TRUE)
		{
			$return_arr['result'] ="success";
			echo json_encode($return_arr);
		} else{
			$return_arr['result'] ="fail";
			echo json_encode($return_arr);
		}
	}
	else if($purchaseType =="contents")
	{
		$cid = $_POST['contents'];
		$query = "INSERT INTO user_contents_info(uid,cid,isDownloaded) VALUES('$uid','$cid',0)";
		$result = $mysqli->query($query);
		if($result==TRUE)
		{
			$return_arr['result'] ="success";
			echo json_encode($return_arr);
		} else{
			$return_arr['result'] ="fail";
			echo json_encode($return_arr);
		}
	}
	else{
		$return_arr['result'] = "error ex) duplicate";
		echo json_encode($return_arr);
	}

	$mysqli->close();
<?php
/**
 * Created by PhpStorm.
 * User: Helianthus
 * Date: 14. 12. 4.
 * Time: 오후 3:17
 */

	# Inset rows into user_contents_info after user finishing purchase contents

// Eye-Tracker Project Web Platform
//
// Author: KyeongPil Kang
// Creation date: 2014/10/24
//
// © Team Confidence
//
// Modification history
// Version 	Modifier    	Date 		Change Reason
// 1.0.1 	KyeongPil Kang 2014/12/04 	change error code
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
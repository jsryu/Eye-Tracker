<?php
/**
 * Created by PhpStorm.
 * User: Helianthus
 * Date: 14. 12. 2.
 * Time: 오후 2:23
 */

	include_once "dbconn.php";



	$query = "SELECT cid FROM contents";
	$result=$mysqli->query($query);


	$row=$result->fetch_array(MYSQLI_NUM);
	$row_cnt = $result->num_rows -1;

	$return_arr['contents_cnt']=$row_cnt;
	echo json_encode($return_arr);

	$result->free();
	$mysqli->close();
?>
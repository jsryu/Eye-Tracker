<?php
/**
 * Created by PhpStorm.
 * User: Helianthus
 * Date: 14. 12. 2.
 * Time: 오후 2:23
 */

	include_once "dbconn.php";

	$uid = $_SESSION['uid'];

	$query = "SELECT "
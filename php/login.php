<?php
  
  #connnect DB
  define('DB_HOST', 'localhost');
  define('DB_NAME', 'blickdb');
  define('DB_USER','blickDB'); 
  define('DB_PASSWORD','blick');

  $mysqli=new mysqli(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
  if (mysqli_connect_error()) {
    exit('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
  }

  #빈칸 없이 입력되었다는 가정 하에 진행
  #user_id 라는 input과 user_pw라는 인풋을 받아옴

  $user = $_POST['user_id'];
  $user_pw = $_POST['user_pw'];

  $query = "SELECT * FROM user WHERE name='$user'";
  $result = $mysqli->query($query);
  
  $return_arr['result'] = '';

  	if(!($row = $result->fetch_array(MYSQLI_ASSOC))){
	  	$return_arr['result'] = 'fail';
	  	$return_arr['desc'] = 'not registered ID.';
		echo json_encode($return_arr);
  		exit;
  	}
  	else{
   		$db_passwd = $row["pw"];
  	}

  	if($user_pw != $db_passwd){
    	//확인용 alert구문2
  		$return_arr['result'] = 'fail';
	  	$return_arr['desc'] = 'Invalid Password.';
		echo json_encode($return_arr);
  		exit;
  	}
  	else{
	  	$uid=$row["uid"];
	
	  	session_start();
	  	$_SESSION['user_id'] = $user;
	    $_SESSION['uid'] = $uid;
	    $_SESSION['user_pw'] = $user_pw;
	    
	    $return_arr['result'] = 'success';
		echo json_encode($return_arr);
	}

?>
<?php
	# after sign up, insert rows into user table
  include_once "dbconn.php";
  if (mysqli_connect_error()) {
    exit('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
  }

  function NewUser() { 			 		//sign up 안에서 씁니당
     //db에 넣을 사용자 input 값
     $userID = $_POST['signupBoxID'];
     $password = $_POST['signupBoxPW']; 
     $address = $_POST['signupBoxAddress'];
     $email = $_POST['signupBoxEmail']; 
     $phonenum = $_POST['signupBoxPhoneNumber'];

     $mysqli = new mysqli(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
  	 $query = "INSERT INTO user (name,pw,email,phonenumber,address) VALUES ('$userID','$password','$email','$phonenum','$address')";
     
  	 if($mysqli->query($query)) {
      session_start();
  	  $uid=$mysqli->insert_id;
      $_SESSION['uid']=$uid;
      $_SESSION['user_id']=$userID;
      $_SESSION['user_pw']=$password;
     }
     else {
        echo "fail!";
     }
     $mysqli->close();
  }

  	function SignUp() {
  		$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
  
   		if(!empty($_POST['signupBoxID'])) //checking the 'user' name from index.html(sign up box), is it empty or have some text
  		{
      	$q = "SELECT * FROM user WHERE name = '$_POST[signupBoxID]'";
      	$res = $mysqli->query($q);
	  		
	  		$return_arr['result'] = 'fail';
	  	 	
	  	 	if(!($res->fetch_array(MYSQLI_NUM))){
	  	 	  NewUser();
				  $return_arr['result'] = 'success';
	  	 	}
			
	  	 	$res->free();
	  	 	$mysqli->close();
			
		    echo json_encode($return_arr);
	  	}
  	}
  
  	function CheckID() {
  		$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
  		
   		if(!empty($_POST['signupBoxID'])) //checking the 'user' name from index.html(sign up box), is it empty or have some text
  		{
      	$q = "SELECT * FROM user WHERE name = '$_POST[signupBoxID]'";
      	$res = $mysqli->query($q);
			  $isExistID = 'false';		 
  	 		if($res->num_rows){
  	 			$isExistID = 'true';
  	 		}
			
      	$res->free();
      	$mysqli->close();
			
			  $return_arr['result'] = 'success';
			  $return_arr['isExist'] = $isExistID;
		    echo json_encode($return_arr);
	    } else {
	  		$return_arr['result'] = 'error';
	  		echo json_encode($return_arr);
	  	}
  	}
  
  	$type = $_POST['type'];
	
	if($type == 'signup'){
		SignUp();
	} else if($type == 'checkID'){
		CheckID();
	}
   

?>
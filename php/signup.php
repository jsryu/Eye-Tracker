<?php
  define('DB_HOST', 'localhost');
  define('DB_NAME', 'blickdb');
  define('DB_USER','blickDB'); 
  define('DB_PASSWORD','blick');

  $mysqli=new mysqli(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
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
  	  
      $_SESSION['user_id']=$userID;
     }
     else {
        echo "fail!";
     }
     $mysqli->close();
  }

  function SignUp() {
  $mysqli=new mysqli(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
  
   	if(!empty($_POST['signupBoxID'])) //checking the 'user' name from index.html(sign up box), is it empty or have some text
  	 { 
  	 	
      $q = "SELECT * FROM user WHERE name = '$_POST[signupBoxID]'";
      $res=$mysqli->query($q);
      //$row=$res->fetch_array(MYSQLI_NUM);
      
  	 	if(!($res->fetch_array(MYSQLI_NUM))){
  	 	 NewUser();        
  	 	}
  	 	else {
  	 	  echo "<script>alert ('SORRY...YOU ARE ALREADY REGISTERED USER...')</script>";
       // echo "<meta http-equiv='refresh' content='0;url=index.html'>";
  	 	}
      $res->free();
      $mysqli->close();
      
	 }
  }
  	 
  //if(isset($_POST['submit'])) {
    //echo "true";
    SignUp(); 
  //} 


?>
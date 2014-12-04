<?php
  
  session_start();
  include "dbconn.php";
  $uid=$_SESSION['uid'];
  $type=$_POST['type'];
  //사용자 uid 받아옴
  if($type=='getInfo')
  {
    $query = "SELECT * FROM user WHERE uid='$uid'";
    $result=$mysqli->query($query);

    $row=$result->fetch_array(MYSQLI_ASSOC);
    $password=$row["pw"];
    $address=$row["address"];
    $email=$row["email"];
    $phonenum=$row["phonenumber"];

    $result->free();

    $return_arr['password']=$password;
    $return_arr['address']=$address;
    $return_arr['email']=$email;
    $return_arr['phonenum']=$phonenum;
    $return_arr['info_result'] = 'select';
    echo json_encode($return_arr);
    
  }
//-----------------------------------------------
  else if($type=='setInfo')
  {   
    $password = $_POST['settingBoxPW']; 
    $address = $_POST['settingBoxAddress'];
    $email = $_POST['settingBoxEmail']; 
    $phonenum = $_POST['settingBoxPhoneNum'];
    
    $update_query = "UPDATE user SET pw='$password', email='$email'$phonenum',address='$address' WHERE uid='$uid'";

    $mysqli->query($update_query);
    $return_arr['info_result'] = 'update';
    echo json_encode($return_arr);
  }

  $mysqli->close();

?>
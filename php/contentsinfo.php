<?php
  
  #connnect DB
  include "dbconn.php";

  $cid = $_POST['cid'];

  $query = "SELECT * FROM contents WHERE cid='$cid'";
  $result = $mysqli->query($query);
  $row=$result->fetch_array(MYSQLI_ASSOC);

  $contents=$row["contentName"];
  $price=$row["price"];
  $description=$row["description"];
  $thumbnail=$row["thumbnail"];
  $exefile=$row["executeFile"];
  
  $result->free();

  $return_arr['contents']=$contents;
  $return_arr['price']=$price;
  $return_arr['description']=$description;
  $return_arr['thumbnail']=$thumbnail;
  $return_arr['exefile'] = $exefile;
  echo json_encode($return_arr);
    
  $mysqli->close();  

?>

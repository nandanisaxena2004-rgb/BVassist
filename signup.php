<?php
include "db.php";

$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];
$role = $_POST['role'];

$sql = "INSERT INTO Users(name,email,password,role)
        VALUES('$name','$email','$password','$role')";

if(mysqli_query($conn, $sql)){
    echo "Signup successful";
} else {
    echo "Signup failed";
}
?>

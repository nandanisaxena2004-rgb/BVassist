<?php
session_start();
include "db.php";

$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM Users WHERE email='$email' AND password='$password'";
$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result) == 1){
    $row = mysqli_fetch_assoc($result);

    $_SESSION['email'] = $row['email'];
    $_SESSION['role'] = $row['role'];
    $_SESSION['user_id'] = $row['user_id'];


    if($row['role'] == "Student"){
        header("Location: student_dashboard.php");
    }
    else if($row['role'] == "Faculty"){
        header("Location: faculty_dashboard.php");
    }
    else{
        header("Location: admin_dashboard.php");
    }
}
else{
    echo "Invalid email or password";
}
?>

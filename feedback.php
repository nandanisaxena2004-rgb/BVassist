<?php
session_start();
include "db.php";

if(!isset($_SESSION['email'])){
    echo "Please login first";
    exit();
}

if($_SERVER["REQUEST_METHOD"] == "POST"){

    $submitted_by = $_SESSION['email'];
    $message = $_POST['message'];
    $date = date("Y-m-d");

    $sql = "INSERT INTO feedback (submitted_by, message, submitted_at)
            VALUES ('$submitted_by', '$message', '$date')";

    if(mysqli_query($conn, $sql)){
        echo "Feedback submitted successfully";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>

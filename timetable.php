<?php
session_start();
include 'db.php';

if (!isset($_SESSION['user_id'])) {
    echo "Please login first";
    exit;
}

$user_id = $_SESSION['user_id'];

// Example query (adjust column names if needed)
$sql = "SELECT * FROM timetable";
$result = mysqli_query($conn, $sql);

echo "<h2>My Timetable</h2>";

if (mysqli_num_rows($result) > 0) {
    echo "<table border='1' cellpadding='8'>";
    echo "<tr>
            <th>Day</th>
            <th>Subject</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>";

    while ($row = mysqli_fetch_assoc($result)) {
        echo "<tr>
                <td>".$row['day']."</td>
                <td>".$row['course_name']."</td>
                <td>".$row['start_time']."</td>
                <td>".$row['end_time']."</td>
              </tr>";
    }
    echo "</table>";
} else {
    echo "No timetable found.";
}
?>

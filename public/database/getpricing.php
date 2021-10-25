<?php
$servername = "pdb22.awardspace.net";
$username = "3325289_clairefoto";
$password = "claire1234";
$dbname = "3325289_clairefoto";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * from `pricing`";

mysqli_select_db($conn, $dbname);
$result = $conn->query($sql);

$resultArr = array();

while ($row = $result->fetch_assoc()) 
    $resultArr[] = $row;
echo json_encode($resultArr);
$conn->close();
?>
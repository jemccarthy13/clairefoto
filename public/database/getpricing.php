<?php
$servername = "pdb22.awardspace.net";
$username = "3325289_clairefoto";
$password = "claire1234";
$dbname = "3325289_clairefoto";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM pricing";
$result = $conn->query($sql);

echo json_encode($result);
$conn->close();
?>
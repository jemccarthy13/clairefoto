<?php
require "./imagecontroller.php";
require "../dbconnect.php";
require "../bootstrap.php";

$requestMethod = init();

$dbConnection = new Database();
$controller = new ImageController($dbConnection, $requestMethod);
$controller->processRequest();
?>
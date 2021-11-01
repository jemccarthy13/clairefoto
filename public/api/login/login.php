<?php
require "./sessioncontroller.php";
require "../dbconnect.php";

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 60000");
header("Access-Control-Expose-Headers: *");

$requestMethod = $_SERVER["REQUEST_METHOD"];

$dbConnection = new Database();
$controller = new SessionController($dbConnection, $requestMethod);
$controller->processRequest();
?>
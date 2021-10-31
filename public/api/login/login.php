<?php
require "./sessioncontroller.php";
require "../dbconnect.php";

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$requestMethod = $_SERVER["REQUEST_METHOD"];

$dbConnection = new Database();
$controller = new SessionController($dbConnection, $requestMethod);
$controller->processRequest();
?>
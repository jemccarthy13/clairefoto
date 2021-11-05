<?php
require "../bootstrap.php";
require "./pricingcontroller.php";
require "../dbconnect.php";

$requestMethod = init();

$dbConnection = new Database();
$controller = new BookingController($dbConnection, $requestMethod);
$controller->processRequest();
?>
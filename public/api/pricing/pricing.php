<?php
require "./pricingcontroller.php";
require "../dbconnect.php";
require "../bootstrap.php";

$requestMethod = init();

$dbConnection = new Database();
$controller = new PricingController($dbConnection, $requestMethod);
$controller->processRequest();
?>
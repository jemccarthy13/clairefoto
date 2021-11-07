<?php
function init()
{
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
  header("Access-Control-Max-Age: 3600");
  header(
    "Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With"
  );
  return $_SERVER["REQUEST_METHOD"];
}
?>

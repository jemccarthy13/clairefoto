<?php
require __DIR__ . "/sendmail.php";
if (!empty($_POST["email"])) {
    $cust_email = $_POST["email"];
    $cust_fname = $_POST["first_name"];
    $cust_lname = $_POST["last_name"];

    $headers = "From:" . $cust_email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
    $headers .= "Date: " . date("r") . "\r\n";

    $my_subject = "Contact Received";

    $content = file_get_contents("./contactconfirm.template");
    $content = str_replace("customer_firstname", $cust_fname, $content);

    $my_message = $content;

    $plain_text =
        "Hello " .
        $cust_fname .
        ", thank you for reaching out.\r\n\r\nI have received your contact request and will respond shortly.\r\n\r\n-Claire";
    send_mail(
        $cust_email,
        $cust_email,
        $cust_email,
        "webmaster@parrotsour.com",
        $my_subject,
        $my_message,
        $plain_text
    );
}
?>
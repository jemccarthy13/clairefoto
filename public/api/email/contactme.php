<?php
require __DIR__ . '/sendmail.php';
 if( !empty($_POST['email'])){
    $cust_email=$_POST['email'];
    $cust_comments=$_POST['comments'];
    $cust_subject=$_POST['subj'];
    $mail_to=$_POST['send_to'];

    $headers="From:".$cust_email."\r\n";
    $headers .= "MIME-Version: 1.0\r\n"; 
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

    $nowtime = time();
    if (!is_dir("contacts")){
      mkdir("contacts");
    }
    $success = file_put_contents("contacts/ct".$nowtime.".txt", $cust_comments); 

    $my_subject = "New Contact";

    $html_comments = str_replace("\r\n","<br>", $cust_comments);
    $html_comments = str_replace("\n","<br>", $html_comments);
    $html_comments = str_replace("\r","<br>", $html_comments);

    $content = file_get_contents("./newcontact.template");
    $content = str_replace("customer_email", $cust_email, $content);
    $content = str_replace("customer_subject", $cust_subject, $content);
    $content = str_replace("html_comments", $html_comments, $content);

    $content = $content."\r\n\r\nReply to this email to respond to the sender.";
    $my_message = $content;

    $plain_text = "New Contact from: ".$cust_email."\r\n";
    $plain_text .= "Subject: ".$cust_subject."\r\n";
    $plain_text = "Message: ".$cust_comments."\r\n";
    
    send_mail(
      $mail_to, 
      $cust_email, 
      $cust_email,
      $cust_email, 
      $my_subject,
      $my_message,
      $plain_text, 
      "webmaster@clairemariefotografie.com");      
}
?>
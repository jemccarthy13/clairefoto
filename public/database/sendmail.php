<?php
function send_mail($mailto, $from_mail, $from_name, $replyto, $subject, $msg, $plainTxt) {
    $uid = md5(uniqid(time()));
   
    $eol = PHP_EOL;
  
    $header = "From: ".$from_name." <".$from_mail.">".$eol;
    $header .= "Reply-To: ".$replyto.$eol;
    $header .= "MIME-Version: 1.0".$eol;
    $header .= "Content-type: multipart/alternative; boundary=----=_NextPart_" . $uid;
  
    $message = "Hello in plain text";
  
    $message = "This is multipart message using MIME\n";
  
    $message .= "------=_NextPart_" . $uid . "\n";
    $message .= "Content-Type: text/plain; charset=UTF-8\n";
    $message .= "Content-Transfer-Encoding: 7bit". "\n\n";
    $message .= $plainTxt . "\n\n";
    $message .= "------=_NextPart_" . $uid . "\n";
    $message .= "Content-Type: text/html; charset=UTF-8\n";
    $message .= "Content-Transfer-Encoding: 7bit". "\n\n";
    $message .= $msg . "\n\n";    

    $message .= "------=_NextPart_" . $uid . "--";
   
    if (@mail($mailto, $subject, $message, $header, " -fwebmaster@claire.parrotsour.com")) {
      echo "mail send ... OK"; // or use booleans here
    } else {
      $errorMessage = error_get_last()['message'];
      http_response_code(500);
      echo $errorMessage;
      echo var_dump($errorMessage);
      echo "mail send ... ERROR!";
   }
  }
?>

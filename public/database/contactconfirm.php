<?php
require __DIR__ . '/sendmail.php';
 if( !empty($_POST['email'])){
    $cust_email=$_POST['email'];
    $cust_fname=$_POST['first_name'];
    $cust_lname=$_POST['last_name'];

    $headers="From:".$cust_email."\r\n";
    $headers .= "MIME-Version: 1.0\r\n"; 
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n"; 
    $headers .= "Date: ".date("r")."\r\n";

    $my_subject = "Contact Received";

    $content = '<html>
    <body style="background-color: #f7f7f7;color: #000000;">
      <div style="margin: 0 auto; min-width: 320px;max-width: 550px;background-color: #111111;">
        <div style="max-width: 320px;min-width: 550px;display: inline-flex;vertical-align: top;">
          <img align="center" border="0" src="http://claire.parrotsour.com/images/emails/logo.png" alt="Logo" title="Logo" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;border: none;height: auto;float: none;width: 100%;max-width: 550px;" width="550"/>
        </div>
      </div>

      <div style="margin: 0 auto;min-width: 320px;max-width: 550px;background-color: #ffffff;">
        <div style="width:100%;vertical-align: top; padding:10px; font-size:28px;font-family: arial,sans-serif;text-align:center">
          Contact Received
        </div>
    
        <div style=" text-align: left; padding-left:10px;font-family:helvetica,sans-serif; font-size:16px;">
          <p><strong>Hi '.$cust_fname.',</strong></p>
          <p>&nbsp;</p>
          <p>Thank you for reaching out!</p>
          <p>&nbsp;</p>
          <p>I\'ve received your contact request and will be in touch as soon as possible.</p>
          <p>&nbsp;</p>
          <p><br />Claire<br /><strong>Claire-Marie Fotografie</strong><br />&nbsp;</p>
          <p style="font-size:12px">*This message is from an unmonitored address. Replies will not be received.</p>
        </div>
      
        <hr/>
      
        <div style="text-align: left; padding:10px;font-family:helvetica,sans-serif; font-size:16px;">
          <p><strong>Questions? </strong>Contact us anytime at <a rel="noopener" href="mailto:clairemariefotografie@yahoo.de" target="_blank">clairemariefotografie@yahoo.de</a></p>
          <div style="display:flex; text-align:center;width:max-content;margin:auto">
            <a style="padding:10px" href="https://www.facebook.com/clairemariefotografie" title="Facebook" target="_blank">
              <img src="http://claire.parrotsour.com/images/emails/fb-icon-color.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;border: none;height: auto;float: none;max-width: 32px !important">
            </a>
            <a style="padding:10px" href="https://www.instagram.com/clairemariefotografie" title="Instagram" target="_blank">
              <img src="http://claire.parrotsour.com/images/emails/insta-icon-color.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;border: none;height: auto;float: none;max-width: 32px !important">
            </a>
          </div>      
          <div style="color: #888888; text-align: center;">
            <p style="font-size: 14px;">&copy; 2021 Claire-Marie Fotografie. All Rights Reserved.</p>
          </div>
       </div>
      </div>
    </body>
    </html>';
    $my_message = $content;

    $plain_text = "Hello ".$cust_fname.", thank you for reaching out.\r\n\r\nI have received your contact request and will respond shortly.\r\n\r\n-Claire";
    send_mail($cust_email, $cust_email, $cust_email, "webmaster@parrotsour.com", $my_subject, $my_message,$plain_text);      
}
?>
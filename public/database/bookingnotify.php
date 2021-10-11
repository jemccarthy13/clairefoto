<?php
require __DIR__ . '/sendmail.php';
 if( !empty($_POST['email'])){
    $email=$_POST['email'];
    $mail_to=$_POST['send_to'];

    $headers="From:".$email."\r\n";
    $headers .= "MIME-Version: 1.0\r\n"; 
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

    $my_subject = "New Booking -- {date/time}";

    $content = '<html>
    <head>
      <style type="text/css">
      body{
        margin:0 auto;
        padding:0;
        background-color:#293c4b;
        color:#000000;
        font-family: Montserrat,sans-serif;
      }
      .msg-content{
        margin:0 auto;
        max-width:320px;
        min-width:550px;
        vertical-align: top;
      }
      .reminder{
        background-color: #ffffff;
        padding-left:20px;
      }
      .reminder-header{
        background-color:#843fa1;
        color:#ffffff;
        text-align:center;
        width: 100% !important; 
        font-size: 23px;
      }
      .image{
        outline:none;
        text-decoration: none;
        clear:both;
        border:none;
        height:auto;
        width:100%;
      }
      p{
        padding-bottom:40px;
        font-size: 16px;
        font-family: Lato, sans-serif;
      }
      .greeting{
        margin: 0px;
        color: #293c4b;
        padding-top:40px;
        padding-bottom:20px; 
        text-align: left; 
        font-family: Montserrat,sans-serif; 
        font-size: 18px;
      }
      </style>
  </head>
  <body>
    <div class="msg-content">
      <a href="http://claire.parrotsour.com" target="_blank">
        <img class="image" align="center" src="http://claire.parrotsour.com/images/email/logo.png" alt="Logo" title="Logo"/>
      </a>
    
      <div class="reminder-header">
        <div style="padding:20px;">
            Upcoming Appointment Reminder
        </div>
        <img class="image" src="http://claire.parrotsour.com/images/email/calendar-transparent.png" alt="Calendar" title="Calendar" style="width: 25%;max-width: 130px;padding:20px"/>
      </div>
  
      <div class="reminder">
        <div class="greeting">
          <strong>Hi {name},</strong>
        </div>
        <p>Your booking has been confirmed. I will reach out to you soon to coordinate the location where you\'d like the photoshoot to happen.</p>
        
        <div style="text-align: center;">
          <p style="color: #7db00e;padding-bottom:0px"><strong>{Date} {time} </strong></p>
          <p><strong>{session}</strong></p>
        </div>
  
        <div style="color: #656e72;">
          <p>If you need to change or cancel your appointment, please contact me at <a rel="noopener" href="mailto:clairemariefotografie@yahoo.de" target="_blank">clairemariefotografie@yahoo.de</a>.</p>
          <p style="font-size: 10px;">This message is from an unmonitored mailbox. Replies will not be received or responded to.</p>
        </div>
  
        <hr/>
          
        <div style="display:flex; text-align:center;width:max-content;margin:auto">
          <a style="padding:10px" href="https://www.instagram.com/clairemariefotografie" title="Instagram" target="_blank">
            <img class="image" src="http://claire.parrotsour.com/images/email/insta-icon-color.png" alt="Instagram" title="Instagram" width="32" style="height: auto;max-width: 32px !important">
          </a>
  
          <a style="padding:10px" href="https://www.facebook.com/clairemariefotografie" title="Facebook" target="_blank">
            <img class="image" src="http://claire.parrotsour.com/images/email/fb-icon-color.png" alt="Facebook" title="Facebook" width="32" style="height: auto;max-width: 32px !important">
          </a>
        </div>
      </div>
   
      <div style="color: #7e8c8d;text-align: center;">
        <p style="font-size: 14px;">&copy; Claire-Marie Fotografie. All Rights Reserved.</p>
      </div>
    </div>
  </body>
  </html>';
    $my_message = $content;

    $plain_text = "Hi ".$cust_fname.",\r\n"
    $plain_text .= "Your photoshoot is confirmed for {date} {time}.\r\n\r\n"
    $plain_text .= "I will reach out to you shortly to coordinate your desired location.\r\n\r\n"
    $plain_text .= "-Claire\r\n\r\n"
    $plain_text .= "This mailbox is not monitored. Please contact me at clairemariefotografie@yahoo.de.\r\n"

    send_mail($mail_to, $email, $email, $email, $my_subject, $my_message, $plain_text);      
}
?>
<?php 

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$message = $_POST['user_message'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'mediastore.uz@mail.ru';                 // Наш логин
$mail->Password = 'tTtYo$rUOd12axewgvrebdvcwscs';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('mediastore.uz@mail.ru', 'mediastore.uz');   // От кого письмо 
$mail->addAddress('info@mediastore.uz');     // Add a recipient
//$mail->addAddress('mediastore.uz@yandex.ru');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = $name;
$mail->Body    = '
	Пользователь оставил свои данные <br> 
	Имя: ' . $name . ' <br>
	Телефон: ' . $phone . '<br>
	Сообщение: ' . $message . '';
	//	Сайт: ' . $site . ' <br>//
/*$mail->AltBody = 'Это альтернативный текст';*/

if(!$mail->send()) {
    return false;
} else {
	return true;
/*    header('location: ../thanks.html');*/
}

?>
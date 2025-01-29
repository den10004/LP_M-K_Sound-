<?php

// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     $to = "examples23@yandex.ru";
//     $subject = "weqw";
//     $name = $_POST['name'];
//     $tel = $_POST['tel'];
//     echo "Данные успешно получены! Имя: $name, Email: $email";
//     if (mail($to, $subject, $name . $tel)) {
//         echo "Письмо успешно отправлено!";
//     }
// } else {
//     http_response_code(400);
//     echo "Ошибка при отправке письма.";
// }

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    //Load Composer's autoloader
    require dirname(__DIR__) . '/vendor/autoload.php';

    //Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);

    try {
        //Server settings
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER;
        $mail->isSMTP();
        $mail->Host = 'smtp.timeweb.ru';
        $mail->SMTPAuth = true;
        $mail->Username = 'info@audioholics.ru';
        $mail->Password = '0S376B79j';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;

        //Recipients
        $mail->setFrom('info@audioholics.ru', 'info@audioholics.ru');
        //$mail->addAddress('examples23@yandex.ru');
        $mail->addAddress('popkov@conversionpro.agency');

        //Attachments
        // $mail->addAttachment('/var/tmp/file.tar.gz');
        // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');

        //Content
        $mail->isHTML(true);
        $mail->Subject = 'Письмо с сайта Audio Holics';

        $data = [];
        // $data = array_map('htmlspecialchars', $_POST);
        foreach ($_POST as $key => $value) {
            $key = htmlspecialchars($key, ENT_QUOTES);
            if ($key === 'name') {
                $key = 'Имя';
            }
            if ($key === 'tel') {
                $key = 'Телефон';
            }
            if ($key === 'model') {
                $key = 'Модель';
            }
            if ($key === 'title') {
                $key = 'Заголовок';
            }
            if ($key === 'receiver-select') {
                $key = 'Выбранный ресивер';
            }
            $value = htmlspecialchars($value, ENT_QUOTES);
            $data[$key] = $value;
        }

        ob_start();
        include_once 'email/template.php';
        $body = ob_get_flush();

        $mail->Body = $body;

        $mail->DKIM_domain = 'audioholics.ru';
        $mail->DKIM_private = '/home/d/dmstyle/audioholics.ru/dkim/audioholics.ru.private';
        $mail->DKIM_selector = 'mail';
        $mail->DKIM_passphrase = '';
        $mail->DKIM_identity = 'info@audioholics.ru';

        $mail->send();
        echo "Письмо успешно отправлено!";
    } catch (Exception $e) {
        http_response_code(400);
        echo "Ошибка при отправке письма!";
    }
}

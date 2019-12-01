<?php


/*
Форма обратной связи может получать сообщения с любых почтовых ящиков.
Исправлена проблема кодировки при получении писем почтовым клиентом Outlook.
*/
if (isset($_POST["name"]) && isset($_POST["phone"])) {

	/* Устанавливаем e-mail Кому и от Кого будут приходить письма */
	$to = "brbarbershop.kz@gmail.com"; // Здесь нужно написать e-mail, куда будут приходить письма   
	$from = "info@brbarbershop.kz"; // Здесь нужно написать e-mail, от кого будут приходить письма, например no-reply(собака)epicblog.net

	/* Указываем переменные, в которые будет записываться информация с формы */
	$first_name = $_POST['name'];
	echo "Сообщение отправлено. Спасибо Вам " . $first_name . ", мы скоро свяжемся с Вами.";
	//$email = $_POST['email'];
	$phone = $_POST['phone'];
	$day = $_POST['day'];
	$time = $_POST['time'];
	//$message = $_POST['message'];
	$subject = "Форма отправки сообщений с сайта BrBarberShop.kz";



	/* Переменная, которая будет отправлена на почту со значениями, вводимых в поля   E-mail: $email*/
	$mail_to_myemail = "Здравствуйте! 
Было отправлено сообщение с сайта! 
Имя клиента: $first_name
Номер телефона: $phone
День: $day
Время: $time
Чтобы ответить на письмо, создайте новое сообщение, скопируйте электронный адрес и вставьте в поле Кому.";

	$headers = "From: $from \r\n";

	/* Отправка сообщения, с помощью функции mail() */
	mail($to, $subject, $mail_to_myemail, $headers . 'Content-type: text/plain; charset=utf-8');
	echo '<h2>Поздравляем !</h2>' . '<p> ' . $first_name . 'Вы записались в <nobr>Br BarberShop</nobr> на: <br>' . $day . 'в' . $time . 'часов <br><br>' + 'В случае изменений мы свяжемся в вами по номеру: <br>' . $phone . '</p>';
}
?>
<!--Переадресация на главную страницу сайта, через 3 секунды-->
<link href="https://fonts.googleapis.com/css?family=Exo+2:300,500,600,700,800,900,&display=swap&subset=cyrillic" rel="stylesheet">
<script language="JavaScript" type="text/javascript">
	function changeurl() {
		eval(self.location = "https://brbarbershop.kz");
	}
	window.setTimeout("changeurl();", 3000);
</script>

<style>
	body {
		color: #fff;
		background-color: #2e2e2e;
		text-align: center;
		font-family: "Exo 2", sans-serif;
		background-image: url(blackorchid.png);

	}

	h2 {
		font-size: 70% ;
	}
	p{
		font-size: 60% ;
	}
</style>
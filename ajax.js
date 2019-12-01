$(document).ready(function () {
    $("#btn").click(
        function () {
            sendAjaxForm('result_form', 'ajax_form', 'action_ajax_form.php');
            return false;
        }
    );
});

function sendAjaxForm(result_form, ajax_form, url) {
    $.ajax({
        url: url, //url страницы (action_ajax_form.php)
        type: "POST", //метод отправки
        dataType: "html", //формат данных
        data: $("#" + ajax_form).serialize(),  // Сеарилизуем объект
        success: function (response) { //Данные отправлены успешно
            result = $.parseJSON(response);
            $('#result_form').html(
                '<h2>Поздравляем !</h2>' +
                '<p> ' + result.name + 'Вы записались в <nobr>Br BarberShop</nobr> на: <br>' + result.day + 'в' + result.time + 'часов <br><br>' + 'В случае изменений мы свяжемся в вами по номеру: <br>' + result.phone + '</p>'
            );
           
        },
        error: function (response) { // Данные не отправлены
            $('#result_form').html('<h2>Ошибка!</h2>  <p> Данные не отправлены.</p>');
        }
    });
}
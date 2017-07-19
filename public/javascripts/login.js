/**
 * Created by god on 6/27/2017.
 */

function goToRegistration() {
    window.location.href = '/registration';
}



function login() {
    var login = $('#idLogin').val();
    var password = $('#idPassword').val();

    if (!login) {
        ShowErrorMessage('Введите Логин, Это поле не может быть пустым!');
        return false;
    }

    if (!password) {
        ShowErrorMessage('Введите Пароль, Это поле не может быть пустым!');
        return false;
    }
    var data = {
        login: login,
        password: password
    }

    $.ajax({
        url: "/login",
        method: "POST",
        data: data,
        statusCode: {
            200: function(user) {
                 if (user) {
                     console.log('login success' + JSON.stringify(user));
                     setCookie('userName', user.username, null);
                     window.location.href = '/createAnswer';
                 }
            },
            403: function(error) {
                if (error.responseText == "User Not Found") {
                    ShowErrorMessage("Пользователь не найден, проверьте правильность логина и пароля");
                }
            },
            404: function (error) {
                ShowErrorMessage(JSON.stringify(error));
            }
        }
    });
    return false;
}
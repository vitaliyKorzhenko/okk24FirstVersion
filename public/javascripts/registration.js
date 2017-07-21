/**
 * Created by god on 6/15/2017.
 */
function UserRegistration() {

    $('#idFormRegistration').form('submit', {
        onSubmit: function () {
            var userName = $("#idUserNameCreateUser").val();
            console.log("current user name" + userName);
            var password = $("#idPasswordCreateUser").val();
            var email = $("#idEmailCreateUser").val();

            if (!userName) {
                ShowErrorMessage('Введите Имя, Это поле не может быть пустым!');
                return false;
            }
            if (!password) {
                ShowErrorMessage('Введите Пароль, Это поле не может быть пустым!');
                return false;
            }

            if (!email) {
                ShowErrorMessage('Емail не может быть пустым');
                return false;
            }

            var user = {
                userName: userName,
                password: password,
                email: email
            }


            $.ajax({
                url: "/registration",
                method: "POST",
                data: user,
                statusCode: {
                    200: function () {
                        ShowMessage('Вы были успешно зарегистрированы в системе! Теперь можете логинится');
                        //TODO: clear inputs
                        },
                    403: function (error) {
                        console.log(error.responseJSON.name);
                        if (error.responseJSON.name == 'SequelizeUniqueConstraintError') {
                            ShowErrorMessage('Имя и Email должны быть уникальными! Ваши уже используются в системе');
                        }
                    }
                }

            });
            return false;
        },
        success: function (data) {
            console.log("result data: + " + data);
        }
    });
}


function clearForm() {
    $('#ff').form('clear');
}
/**
 * Created by god on 6/15/2017.
 */
function UserRegistration() {

    $('#idFormRegistration').form('submit', {
        onSubmit: function () {
            var userName = $("#idUserName").val();
            console.log("current user name" + userName);
            var password = $("#idPassword").val();
            var email = $("#idEmail").val();
            var userType = $("#idUserType").val();

            var user = {
                userName: userName,
                password: password,
                email: email,
                userType: userType
            }

            if (!name)


                if ($(this).form('enableValidation').form('validate')) {
                    console.log("form is submitted");

                    $.ajax({
                        url: "/registration",
                        method: "POST",
                        data: user,
                        statusCode: {
                            200: function () {
                                ShowMessage('Вы были успешно зарегистрированы в системе! Теперь можете логинится');
                                window.location.href = "/login";
                            },
                            403: function (jqXHR) {
                                var error = JSON.parse(jqXHR.responseText);
                                $('.error', form).html(error.message);
                            }
                        }

                    });

                    return false;

                }
                else {
                    console.log("form is not correct");
                }

            return $(this).form('enableValidation').form('validate');
        },
        success: function (data) {
            console.log("result data: + " + data);
        }
    });
}


function clearForm() {
    $('#ff').form('clear');
}
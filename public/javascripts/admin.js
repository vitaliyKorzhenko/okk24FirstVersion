/**
 * Created by god on 6/27/2017.
 */

function createNewUserType() {
    var userType = {
        name: $("#idNameUserType").val(),
        description: $("#idDescriptionUserType").val()
    }
    $.ajax({
        url: "/admin/createUserType",
        method: "POST",
        contentType: 'application/json',
        data: JSON.stringify(userType), //stringify is important
        complete: function () {},
        statusCode: {
            200: function (response) {
                console.log("success create User Type!" + JSON.stringify(response));
            },
            403: function (error) {
                console.log('error');
            }
        }
    });
    return false;
}
/**
 * Created by god on 6/27/2017.
 */





jQuery(function ($) {
    // refreshLogs();
});


function refreshLogs() {

    var data = {limit: '500'};

    $.ajax({
        url: "/admin//getAllLogs",
        method: "POST",
        contentType: 'application/json',
        data: JSON.stringify(data), //stringify is important
        complete: function () {
        },
        statusCode: {
            200: function (response) {
                console.log("response task OBJECT!" + JSON.stringify(response));
                loadLogsToGrid(response.rows);
            },
            403: function (jqXHR) {
                var error = JSON.parse(jqXHR.responseText);
                $('.error', form).html(error.message);
            }
        }
    });
}


function loadLogsToGrid(logs) {
    var resultArray = [];
    if (logs) {
         for (var index in logs) {
             var log = {
              type: logs[index].type,
                 actionName: logs[index].actionName,
                infoMessage: logs[index].infoMessage
            }
            // var log = {
            //     type: 'test',
            //     actionName: 'test',
            //     infoMessage: 'test'
            // }
            resultArray.push(log);
         }
        //  var log = {
        //     type: 'test',
        //      actionName: 'test',
        //     infoMessage: 'test'
        // }
        resultArray.push(log);
        console.log("load data" + JSON.stringify(resultArray));
        $("#idLogsGrid").datagrid('loadData', resultArray);
        $('#idLogsGrid').datagrid('reload');
    }
}


var toolbarLogs = [{
    text: 'Загрузить Новые Логи',
    iconCls: 'icon-add',
    handler: function () {
        refreshLogs();
    }
}, {
    text: 'Перейти к Работе с Пользователями',
    iconCls: 'icon-cut',
    handler: function () {
        alert('cut')
    }
}, '-', {
    text: 'Перейти к Работе с Задачами',
    iconCls: 'icon-save',
    handler: function () {
        alert('save')
    }
}];


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
        complete: function () {
        },
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
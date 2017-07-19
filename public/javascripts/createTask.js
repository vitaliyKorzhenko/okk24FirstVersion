/**
 * Created by god on 6/16/2017.
 */


jQuery(function($) {});



function setPropertyTaskToGrid(resultObj) {
    var resultArray = [];

    for(var property in resultObj) {
        var currentParameter = {};
        currentParameter.name = property;
        currentParameter.label = "";
        currentParameter.currentValue = resultObj[property];
        currentParameter.isActive = 'Yes';
        resultArray.push(currentParameter);
    }
    return resultArray;
}




function createTask() {

    var resourceParameters = $("#idParametersGrid").datagrid("getData");

    var criterions = $("#idCriterionGrid").datagrid('getData');


    console.log("create createResourceParameters" + JSON.stringify(resourceParameters));

    console.log("create criterions" + JSON.stringify(criterions));




    var task = {
        name:$("#idNameTask").val(),
        description: $("#idDescriptionTask").val(),
        url: $("#idUrlTask").val(),
        resourceParameters: resourceParameters,
        criterions: criterions
    };

    if (!task.name) {
        ShowErrorMessage('Введите Имя Задания, Это поле не может быть пустым!');
        return false;
    }
    if(!task.url){
        ShowErrorMessage('Введите Ccылку, Это поле не может быть пустым!');
        return false;
    }
    if(!task.resourceParameters || task.resourceParameters.total == 0 ) {
        ShowErrorMessage('Настройте Параметры! Для этого нажмите кнопку Выгрузить Шаблон');
        return false;
    }
    if(!task.criterions || task.criterions.total == 0){
        ShowErrorMessage('Добавтье критерии для задачи! Для этого нажмите кнопку Добавить Критерий');
        return false;
    }


    $.ajax({
        url: "/task/createTask",
        method: "POST",
        contentType: 'application/json',
        data: JSON.stringify(task), //stringify is important
        complete: function () {},
        statusCode: {
            200: function (response) {
                console.log("response template task" + JSON.stringify(response));
            },
            403: function (jqXHR) {
                var error = JSON.parse(jqXHR.responseText);
                $('.error', form).html(error.message);
            }
        }
    });
    return false;
}



function LoadResourceParameters() {
    var data = {
        url: $("#idUrlTask").val(),
        type: 'json'
    }
    $.ajax({
        url: "/task/loadResourceParameters",
        method: "POST",
        contentType: 'application/json',
        data: JSON.stringify(data), //stringify is important
        complete: function () {},
        statusCode: {
            200: function (response) {
                console.log("response template task" + JSON.stringify(response));
                var resultArray= setPropertyTaskToGrid(response);
                $("#idParametersGrid").datagrid('loadData', resultArray);
            },
            403: function (jqXHR) {
                var error = JSON.parse(jqXHR.responseText);
                $('.error', form).html(error.message);
            }
        }
    });
    return false;
}





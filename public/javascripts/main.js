/**
 * Created by god on 6/23/2017.
 */



jQuery(function($) {
    $("#idNameTask").val("naaaaaame");
    var userName = getCookie('userName');
    console.log('userName: ' + userName);
    document.getElementById('lblUser').innerHTML = 'Логин: ' + userName;
    itemFullInfo.userName = userName;

})


var itemFullInfo = {};


function getFreeItem() {

        console.log("create new Template Task");
        var testData = {user: getCookie('userName')};
        $.ajax({
            url: "/createAnswer/getFreeTask",
            method: "POST",
            data: testData,
            complete: function () {},
            statusCode: {
                200: function (response) {
                    itemFullInfo = response;
                    console.log("response template task" + JSON.stringify(response));
                    createColumnsGridByParameters(response.resourceParameters);
                    loadItem(response.item, response.resourceParameters);
                    loadCriterionToGrid(response.criterions);
                    loadInfoByTask(response.task);
                    // var resultArray= setPropertyTaskToGrid(response);
                    // $("#idParametersGrid").datagrid('loadData', resultArray);
                },
                403: function (jqXHR) {
                    var error = JSON.parse(jqXHR.responseText);
                    $('.error', form).html(error.message);
                }
            }
        });
    return false
}

function loadInfoByTask(task) {
    console.log("load info task" + JSON.stringify(task));
    // $("#idNameTask").val('naaaaaame');
    $( "#idNameTask").text('naaaaaame');
    if (task) {
        if (task.name) {
            $("#idNameTask").val(task.name);
        }
        if (task.description) {
            $("#idDescriptionTask").val(task.description);
        }
    }
}



function createColumnsGridByParameters(parameters) {

    var columns = [];
    for(var index in parameters) {
        var column = {
            field: parameters[index].name,
            width: 100,
            title: parameters[index].name
        }
        columns.push(column);
    }
    console.log("columns" + JSON.stringify(columns));
    var gridColumns = [];
    gridColumns.push(columns);

    $('#idItemGrid').datagrid({
        columns:gridColumns
    });


}

function loadItem(item, parameters) {
    var resultItemArray = [];
    var resultItem = {};
    for(var index in parameters) {
        if (item.value[parameters[index].name]) {
            resultItem[parameters[index].name] = item.value[parameters[index].name];
        }
    }
    resultItemArray.push(resultItem);
    $("#idItemGrid").datagrid('loadData', resultItemArray);
}


function loadCriterionToGrid(criterions) {
// <th data-options="field:'name',width:120">Название Критерия</th>
//     <th data-options="field:'description',width:200">Описание Критерия</th>
//     <th data-options="field:'isActive',width:80,align:'center',editor:{type:'checkbox',options:{on:'Yes',off:'No'}}">
//         Использовать
//         </th>

    console.log("save Criterions to Grid" + JSON.stringify(criterions));


    var criterionsArray = [];

    for (var index in criterions) {
        var resultItem = {};
        if (criterions[index].name) {
            resultItem.name = criterions[index].name;
        }
        if(criterions[index].description) {
            resultItem.description = criterions[index].description;
        }
        resultItem.isActive = 'Нет';
       criterionsArray.push(resultItem);
    }

    $('#idCriterionGrid').datagrid('loadData', criterionsArray);
}








function testApi() {
    console.log('test api')
    var testData = "testApi";
    $.ajax({
        url: "/createAnswer/callInfo",
        method: "POST",
        data: testData,
        complete: function () {},
        statusCode: {
            200: function (response) {
                console.log("response template task" + JSON.stringify(response));
                // var resultArray= setPropertyTaskToGrid(response);
                // $("#idParametersGrid").datagrid('loadData', resultArray);
            },
            403: function (jqXHR) {
                var error = JSON.parse(jqXHR.responseText);
                $('.error', form).html(error.message);
            }
        }
    });
}



function saveAnswer() {

    var answerTemplate = {
        itemId: itemFullInfo.item.id,
        userName: getCookie('userName'),
        value: JSON.stringify($('#idCriterionGrid').datagrid('getData').rows)
    };


    console.log('answer'  + JSON.stringify(answerTemplate));
    $.ajax({
        url: "/createAnswer/saveAnswer",
        method: "POST",
        data: answerTemplate,
        statusCode: {
            200: function (response) {

            },
            403: function (jqXHR) {
                var error = JSON.parse(jqXHR.responseText);
                $('.error', form).html(error.message);
            }
        }
    });
    return false;

}





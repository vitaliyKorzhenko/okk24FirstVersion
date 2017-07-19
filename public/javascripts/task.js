/**
 * Created by god on 6/30/2017.
 */



jQuery(function ($) {


    $("#idTasksGrid").datagrid('hideColumn', 'Id');




var data = {user: {name:'test'}};


    $.ajax({
        url: "/task/getTasks",
        method: "POST",
        contentType: 'application/json',
        data: JSON.stringify(data), //stringify is important
        complete: function () {
        },
        statusCode: {
            200: function (response) {
                console.log("response task OBJECT!" + JSON.stringify(response));
                getTask(response);
            },
            403: function (jqXHR) {
                var error = JSON.parse(jqXHR.responseText);
                $('.error', form).html(error.message);
            }
        }
    });
});


function getTask(tasks) {

// <th data-options="field: 'Id', width: 50, sortable: true, align: 'left' " @*style ="display: none"*@>Id</th>
//     <th data-options="field:'name',width:150,align:'left'">Имя Задачи</th>
//     <th data-options="field:'description',width:150,align:'left',editor:'text'">Описание</th>
//         <th data-options="field:'url',width:150,align:'left'">Cсылка</th>
//         <th data-options="field:'status',width:150,align:'left'">Статус</th>
    var resultArray = [];

    if (tasks){
        for (var index in tasks) {
            var task = {
                Id: tasks[index].id,
                name: tasks[index].name,
                description: tasks[index].description,
                url:tasks[index].urlResource,
                status: tasks[index].status
            }
            resultArray.push(task);
        }
        $("#idTasksGrid").datagrid('loadData', resultArray);
    }

}

function formatDetail(value,row){
    value = row.name;
   console.log("id task"  + row.Id);
    var val = 'Загрузить данные';
    var id = "test1";
   // return '<a href="'+url + row.id+'">'+val+'</a>';
return '<button class="easyui-linkbutton" iconCls="icon-cancel" onclick="loadItems(\'' + row.name + '\', \'' + row.url + '\')">' + val +'</button>';

}


function loadItems(taskName, url) {
    console.log('load Items' + taskName + url);
    var data = {
        url: url,
        type: 'json',
        taskName: taskName
    }
    $.ajax({
        url: "/task/loadItems",
        method: "POST",
        contentType: 'application/json',
        data: JSON.stringify(data), //stringify is important
        complete: function () {},
        statusCode: {
            200: function (response) {
                console.log("items" + JSON.stringify(response));
            },
            403: function (jqXHR) {
                var error = JSON.parse(jqXHR.responseText);
                $('.error', form).html(error.message);
            }
        }
    });
    return false;
}

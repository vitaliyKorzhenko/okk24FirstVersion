/**
 * Created by god on 6/29/2017.
 */

var criterions = [];


var toolbarCriterion = [{
    text: 'Добавить Критерий',
    iconCls: 'icon-add',
    handler: function () {
        $('#dlg').dialog('open').dialog('center').dialog('setTitle','New User');
        $("#idNameCriteria").val('');
        clearCriterionDlg();
    }
}];

function createNewCiterion() {

    var name = $("#idNameCriteria").val();
    var description = $("#idDescriptionCriteria").val();
    var rating = $("#idRatingCriteria").val();
    var criterion = {
        name: name,
        description: description,
        rating: rating
    }

    if (!criterion.name){
        ShowErrorMessage('Введите имя критерия');
        return false;
    }
    if (!criterion.rating){
        ShowErrorMessage('Введите оценку критерия');
        return false;
    }



    $("#idNameCriteria").val("");
    addNewCriterion(criterion);
    $('#dlg').dialog('close')
}


function addNewCriterion(criterion) {
    criterions.push(criterion);
    $("#idCriterionGrid").datagrid('loadData', criterions);

}


function clearCriterionDlg() {
    $("#idNameCriteria").val('');
    $("#idDescriptionCriteria").val('');
    $("#idRatingCriteria").val('');
}









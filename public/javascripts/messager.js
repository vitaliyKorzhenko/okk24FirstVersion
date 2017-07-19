/**
 * Created by god on 6/29/2017.
 */


function ShowErrorMessage(error) {
    $.messager.alert('Ошибка',error);
}


function ShowMessage() {
    $.messager.progress({
        title: 'Please wait',
        msg: 'Loading data...',
        text: 'PROCESSING.......'
    });
}

function HideMessage() {
    $.messager.progress('close');
}


function ShowMessage(message) {
    $.messager.alert('Сообщение', message);
}





























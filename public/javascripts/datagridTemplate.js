/**
 * Created by god on 6/29/2017.
 */

function loadDatagrid(table, collection) {
    var t = table.datagrid('getData').total;
    table.datagrid('loadData', collection);
    if (t == 0) {
        table.datagrid('loadData', collection);
    }
}

function getDatagridInfo(table) {
    var t = table.datagrid('getData');
    return t;

}




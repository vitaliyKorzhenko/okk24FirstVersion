/**
 * Created by god on 7/13/2017.
 */

var promise = require('promise');

var request = require('request');


//defalut URL by Load DATA!
http://198.20.116.214/sellers/index.php?class_name=export_ok&act=make_export_to_ok


function HttpController() {

}

 HttpController.prototype.postRequest =  function(url) {
    console.log('post Request');

    var data = {
        class_name: 'export_ok',
        act: 'make_export_to_ok'
    }
    console.log('data to request' + JSON.stringify(data));
    return new Promise (function (resolve, reject) {
        request.post({
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            url: 'http://198.20.116.214/sellers/index.php',
            data: JSON.stringify(data)
        }, function (error, response, body) {
            if (error) {
                reject(error);
            }
            else {
                console.log('post request response: ' + JSON.stringify(body));
                // var json = JSON.parse(body);
                // console.log("body" + json);
                // console.log(body);
                // resolve(body);
            }

        });
    })


}



module.exports = new HttpController();
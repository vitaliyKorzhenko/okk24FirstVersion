/**
 * Created by god on 6/23/2017.
 */
var express = require('express');
var router = express.Router();

var request = require('request');

var crypto = require('crypto');

var ksort = require('ksort');

var taskController = require('../controllers/taskController');

var mainController = require('../controllers/mainController');


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('main');
    // res.send('respond with a resource');
});


router.post('/', function (req, res, next) {
    //todo: get user
    console.log("post to main:" + JSON.stringify(req.body));
    res.render('main');
    // res.send('respond with a resource');
});

router.post('/callInfo', function (req, res, next) {
    console.log('call info');


    var arrayCallID = [{timestamp: 1390528862}];

    arrayCallID = ksort(arrayCallID);
    console.log('array' + JSON.stringify(arrayCallID));

    var secret = '628701-ad4cce-8aec0d-e2ba93-02cca954';

    var result = secret.concat(JSON.stringify(arrayCallID));


    var signature = crypto.createHash('md5').update(result).digest("hex");


    console.log('signature:' + signature);
    console.log('result' + result);

    var data = {

        timestamp: 1390528862,
        signature: signature,
        key: '5b89ce-647a3ff',
    }
    console.log('data to request' + JSON.stringify(data));

    request.post({
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        url: 'https://api.binotel.com/api/2.0/stats/all-incoming-calls-since.json',
        data: JSON.stringify(data)
    }, function (error, response, body) {
        console.log(body);
    });

})

router.post('/getFreeTask', function (req, res, next) {
    console.log('get free task');
    //c юзером и сессией будем разбираться
    var user = req.body.user;
    console.log("user" + JSON.stringify(user));
    taskController.getTaskByUser(user).then(function (response) {
        console.log('get free task resuult' + JSON.stringify(response));
        res.statusCode = 200;
        res.send(response);
    }, function (error) {
        console.log('error');
        res.statusCode = 403;
        res.send(error);
    })
})


router.post('/saveAnswer', function (req, res, next) {
    var itemId = req.body.itemId;
    var userName = req.body.userName;
    var value = req.body.value;
    console.log('save answer' + itemId + ' ' + " " + userName + ' ' + value);
    mainController.createAnswer(itemId, userName, value).then(function (answer) {
        res.statusCode = 200;
        res.send(answer);
    }, function (error) {
        console.log('create Answer error' + error);
        res.statusCode = 403;
        res.send(error);
    })

})




module.exports = router;
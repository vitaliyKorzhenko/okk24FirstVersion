/**
 * Created by god on 6/13/2017.
 */
var express = require('express');
var router = express.Router();

// var userController = require('../controllers/userController');

var userController = require('../controllers/userController');

//
// /* GET users listing. */
router.get('/', function(req, res, next) {
    // res.send('respond with a resource');
    // console.log("get login" + JSON.stringify(req));
    res.render('login');
    // // res.send('respond with a resource');
})

router.post('/', function (req, res, next) {
    var login = req.body.login;
    var password = req.body.password;
    userController.login(login, password).then(function (response) {
        console.log("login success: "  + response);
        res.status(200);
        res.send(response);
    },function (error) {
        console.log("error:" + error);
        res.status(403);
        res.send(error);
    })
})


router.post('/reg', function (req, res, next) {
    res.render('reg');
}) 



module.exports = router;
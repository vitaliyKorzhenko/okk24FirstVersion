/**
 * Created by god on 6/15/2017.
 */
var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

router.get('/', function(req, res, next) {
    res.render('regNewAccount');
    // res.send('respond with a resource');
});



router.post('/', function (req, res, next) {
    console.log("registration  post" + JSON.stringify(req.body));
    var login = req.body.userName;
    var password = req.body.password;
    var email =  req.body.email;

    userController.createNewUser(login, password, email, 'admin').then(function (response) {
        console.log("success" + response);
            res.status(200);
            res.send('');

    }, function (error) {
            console.log("error: " + error);

            res.status(403);
            res.send(error);
    })
    console.log("post login :" + login + password);
})







module.exports = router;
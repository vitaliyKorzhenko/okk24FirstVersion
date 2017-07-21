/**
 * Created by god on 6/27/2017.
 */
var express = require('express');
var router = express.Router();

var adminController = require('../controllers/adminController');


var logController = require('../controllers/logController');

// /* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('admin');
})

router.post('/createUserType', function (req, res, next) {
   console.log('create user type: ' + JSON.stringify(req.body));
   adminController.createUserType(req.body.name, req.body.description).then(function (createdUserType) {
       res.status(200);
       res.send(createdUserType);
   }, function (error) {
       res.status(403);
       res.send(error);
   })
})


router.post('/getAllUsers', function (req, res, next) {
    
})


router.post('/getAllLogs', function (req, res, next) {
    //настроим дату потом или чет такое
    console.log("!getAllLogs");
    logController.getAllLogs().then(function (response) {
        res.status(200);
        res.send(response);
    }, function (error) {
        res.status(403);
        res.send(error);
    })


})





module.exports = router;
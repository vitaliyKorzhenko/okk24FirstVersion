var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});




router.get('/createType', function(req, res, next) {
  //TODO: create promise to this function
  //   userController.createNewUserType('admin');
  //   res.send('12312312');

    userController.createNewUserType('user').then(function (response) {
        if (response){
            console.log("sucess create new User Type" + JSON.stringify(response));
            res.end('success create new user type');
        }
    }, function (error) {
        console.log("error create new user Type"  + JSON.stringify(error));
        res.end(error);
        // res.end('error create new User Type');
    })

});


router.get('/createNewUser', function (req, res, next) {
    console.log("go create new User");
    userController.createNewUser('vitaliy', 'password', 'vitaliyua@gmail.com', 'admin').then(function (response) {
        if (response) {
            console.log("create new user" + JSON.stringify(response));
            res.end("success create new user");
        }
    }, function (error) {
        res.end(error);
    })
})

module.exports = router;

/**
 * Created by god on 6/16/2017.
 */

var uuid = require('node-uuid');

var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

var taskController = require('../controllers/taskController');


var httpController = require('../controllers/httpController');




/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('task');
    // res.send('respond with a resource');
});





router.post('/', function (req, res, next) {

    console.log("post task:" + JSON.stringify(req.body));

    var name = req.body.name;
    var description = req.body.description;
    var rating = req.body.rating;

    taskController.createCriteria(name,description,rating).then(function (response) {
        if (response) {
            console.log("success create criteria" + response);
            res.statusCode = 200;
            res.end(response.id);
        }
    }, function (error) {
        res.statusCode = 403;
        res.end(error);
        console.log("error create criteria" + error);
    })

})



router.get('/createNewTask', function (req, res, next) {
    res.render('createTask');
})

router.post('/createTask', function (req, res, next) {
    console.log('create Task' + JSON.stringify(req.body));
     var name = req.body.name;
     var url = req.body.url;
     var parameters = req.body.resourceParameters;
     var description = req.body.description;
     var criterions = req.body.criterions;

    taskController.createTask(name, url, description,parameters, criterions).then(function (response) {
        res.statusCode = 200;
        res.send(response);
    }, function (error) {

    })
})


router.post('/createNewTask', function (req, res, next) {

  taskController.getDataByUrl('testUrl', 'json').then(function (response) {
      res.statusCode = 200;
      res.send(response);
  }, function (error) {

  })
})

router.post('/createResourceParameters', function (req, res, next) {
    var rows = req.body.rows;
    var total = req.body.total;
    console.log("createResourceParameters Post:" + JSON.stringify(req.body));
    var resultArray = [];
    for(var row in rows) {
        var item= {};
        item.name = rows[row].name;
        item.label = rows[row].label;
        item.type = "call";
        resultArray.push(item);
    }
    var result  = taskController.createResourceParameter(resultArray);
})




//load by URL Parameters
router.post('/loadResourceParameters', function (req, res, next) {
    console.log('load resource: '+ JSON.stringify(req.body));
    var url = req.body.url;
    if(url){
    httpController.postRequest('testUrl').then(function (response) {
        console.log('url result!' + response);
    }, function (error) {
        console.log|('error' + error);
    })
     // taskController.getDataByUrl(url,'json').then(function (result) {
     //        if (result) {
     //            res.statusCode =200;
     //            res.send(result);
     //        }
     //    }, function (error) {
     //
     //    });
    }
})

router.post('/loadItems', function (req, res, next) {
    console.log('load items: '+ JSON.stringify(req.body));
    var url = req.body.url;
    var taskName = req.body.taskName;

    if(url){
        taskController.createItems(taskName,url).then(function (result) {

            if (result) {
                res.statusCode = 200;
                res.send(result);
            }
        }, function (error) {

        });
    }
})

// router.post('/callIndetifacto')











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


router.post('/getTasks', function (req, res, next) {


    //сюда нужно будет еще юзера вкинуть! может сегодня доделаю

    console.log('req body' + JSON.stringify(req.body));

    taskController.getTasks({name:'test'}).then(function (response) {
        if (response) {
            res.statusCode = 200;
            res.send(response);
        }
        console.log('result' + JSON.stringify(response));
    }, function (error) {

    })


})






module.exports = router;
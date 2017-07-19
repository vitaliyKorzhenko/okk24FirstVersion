/**
 * Created by god on 6/16/2017.
 */

var promise = require('promise');


// var uuidV1 = require('uuid/v1');

var uuid = require('node-uuid');

var Task = require('../node_modules/.bin/models').Task;

var User = require('../node_modules/.bin/models').User;

var Criterion = require('../node_modules/.bin/models').Criterion;


var ResourceParameter = require('../node_modules/.bin/models').ResourceParameter;


var Item = require('../node_modules/.bin/models').Item;


var Answer = require('../node_modules/.bin/models').Answer;

var UserType =  require('../node_modules/.bin/models').UserType;
var jsonfile = require('jsonfile')


var file = '/Node Servers/testResource/data.json';


function TaskController() {
    Task.hasMany(ResourceParameter, {as: 'ResourceParameters'});
    Task.hasMany(Criterion, {as: 'Criterions'});
    Task.hasMany(Item, {as: 'Items'});


    User.hasMany(Answer, {as: 'Answers'});
    Item.hasMany(Answer, {as: 'Answers'});


    UserType.hasMany(User, {as: 'Users'});



    // Task.belongsToMany(User, {through: 'UserTask'});
    // User.belongsToMany(Task, {through: 'UserTask'});
}




TaskController.prototype.getTaskByUser = function (user) {

    return new Promise(function (resolve, reject) {
        if (user) {
            Item.findOne({where: {status: '0'}}).then(function (item) {
                console.log("find item" + JSON.stringify(item));
                if (item) {
                    if (item.TaskId) {
                        Task.findOne({where: {id: item.TaskId}}).then(function (taskResult) {
                            console.log("find task" + JSON.stringify(taskResult));
                            taskResult.getCriterions().then(function (criterions) {
                                if (criterions) {
                                    taskResult.getResourceParameters().then(function (resourceParameters) {
                                        if (resourceParameters) {
                                            var result = {
                                                item: item,
                                                task: taskResult,
                                                criterions: criterions,
                                                resourceParameters: resourceParameters
                                            }
                                            resolve(result);
                                        }
                                    })

                                }
                            })
                        })
                    }
                }
                else {
                    reject('not free items');
                }
            })
        }
    })

}


TaskController.prototype.saveAnswerTask = function (result) {

}


TaskController.prototype.createCriteria = function (name, description, rating) {


    return new Promise(function (resolve, reject) {

        Criterion.create({id: uuid.v1(), name: name, description: description, rating: rating}).then(function (task) {
            if (task) {
                console.log("create new Task" + JSON.stringify(task));
                resolve(task);
            }
        }, function (error) {
            reject(error);
        })
    })
}


TaskController.prototype.getDataByUrl = function (url, resultType) {

    var resultArray = [];
    return new Promise(function (resolve, reject) {
        if (url && resultType == 'json') {

            jsonfile.readFile(file, function (err, obj) {
                if (err !== null) {
                    reject(err);
                }
                else {
                    for (var property in obj) {
                        resultArray.push(obj[property]);
                    }
                    resolve(resultArray[0]);
                }
            })
        }
    })
}


TaskController.prototype.createTask = function (name, url, description, parameters, criterions) {
    return new Promise(function (resolve, reject) {

        Task.create({name: name, urlResource: url, status: 'Active', description: description}).then(function (task) {
            if (task) {
                console.log("create new Task" + JSON.stringify(task));
                // resolve(task);
                if (parameters && parameters !== []) {

                    ResourceParameter.bulkCreate(parameters.rows).then(function (createdResourceParameters) {
                        // console.log('parameters: ' + JSON.stringify(createdResourceParameters));
                        if (createdResourceParameters && criterions) {
                            Criterion.bulkCreate(criterions.rows).then(function (createdCriterions) {
                                task.setResourceParameters(createdResourceParameters);
                                task.setCriterions(createdCriterions);
                                reject(task);
                            })
                        }
                    }, function (error) {
                        console.log("error: " + error);
                    })
                }
            }
        }, function (error) {
            reject(error);
        })
    })
}


TaskController.prototype.saveDataByUrl = function () {
    var resultData = [];


}


TaskController.prototype.createItems = function (nameTask, url) {
    var resultArray = [];
    return new Promise(function (resolve, reject) {
        if (url) {

            jsonfile.readFile(file, function (err, obj) {
                if (err !== null) {
                    reject(err);
                }
                else {
                    for (var property in obj) {
                        var item = {
                            value: obj[property],
                            status: '0'
                        }
                        resultArray.push(item);
                    }
                    console.log("result items: " + JSON.stringify(resultArray));
                    Task.findOne({where: {name: nameTask}}).then(function (task) {
                        if (task) {
                            Item.bulkCreate(resultArray).then(function (items) {
                                // console.log('parameters: ' + JSON.stringify(createdResourceParameters));
                                task.setItems(items);
                            }, function (error) {
                                console.log("error: " + error);
                            })
                        }
                    })


                    resolve(resultArray[0]);
                }
            })
        }
    })
}


TaskController.prototype.createResourceParameter = function (parameters) {
    ResourceParameter.bulkCreate(parameters).then(function (createdResourceParameters) {
        console.log('parameters: ' + JSON.stringify(createdResourceParameters));
    }, function (error) {
        console.log("error: " + error);
    })
    return true;
}


TaskController.prototype.getTasks = function (user) {
    return new Promise(function (resolve, reject) {
        Task.findAll().then(function (tasks) {
            if (tasks) {
                resolve(tasks);
            }
        }, function (error) {
            reject(error);

        })
    })
}


module.exports = new TaskController();
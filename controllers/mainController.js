/**
 * Created by god on 6/23/2017.
 */
var promise = require('promise');


// var uuidV1 = require('uuid/v1');

var uuid = require('node-uuid');

var Task = require('../node_modules/.bin/models').Task;

var Criterion = require('../node_modules/.bin/models').Criterion;


var ResourceParameter = require('../node_modules/.bin/models').ResourceParameter;


var Item = require('../node_modules/.bin/models').Item;

var User = require('../node_modules/.bin/models').User;

var Answer = require('../node_modules/.bin/models').Answer;

var jsonfile = require('jsonfile')
var file = '/Node Servers/testResource/data.json';


function MainController() {

}


// function createAnswer(idTask, user, value) {
//
//     return new Promise (function (resolve, reject) {
//         Answer.create({value:value}).then (function (answer) {
//             if (answer) {
//                 resolve(answer);
//             }
//         }, function (error) {
//             reject(error);
//         })
//     })
// }

MainController.prototype.createAnswer = function (idItem, userName, value) {
    return new Promise(function (resolve, reject) {
        User.findOne({where: {username: userName}}).then(function (user) {
            if (user) {
                Item.findOne({where: {id: idItem}}).then(function (item) {
                    if (item) {
                        Answer.create({value: value}).then(function (answer) {
                            if (answer) {

                                Item.update({status: '1'}, {where: {id: idItem}}).then(function (updatedItem) {
                                    user.addAnswers(answer);
                                    item.addAnswers(answer);
                                    resolve(answer);
                                }, function (error) {
                                    reject(error);
                                })

                            }
                        }, function (error) {
                            console.log('create answer error' + error);
                            reject(error);
                        })
                    }
                }, function (error) {
                    reject(error);
                })
            }
            else {
                //TODO: session close! cookie error
                reject("error");
            }

        }, function (error) {
            reject(error);
        })
    })
}


MainController.prototype.getAnswersIdByUser = function (itemId, userID) {

    return new Promise(function (resolve, reject) {
        Answer.findOne({where: {ItemId: itemId, UserId: userID}}).then(function (answer) {
            console.log('answer' + JSON.stringify(answer));
        }, function (error) {

        })
    })


}


module.exports = new MainController();
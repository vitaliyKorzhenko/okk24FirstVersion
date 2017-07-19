/**
 * Created by god on 6/11/2017.
 */


var promise = require('promise');


// var uuidV1 = require('uuid/v1');

var uuid = require('node-uuid');

var UserType = require('../node_modules/.bin/models').UserType;

var User = require('../node_modules/.bin/models').User;


function UserController() {
}


UserController.prototype.getUsers = function (user) {
    return new Promise(function (resolve, reject) {
        User.findAll().then(function (users) {
            if (users) {
                resolve(users);
            }
        }, function (error) {
            reject(error);

        })
    })
}


// default User Type: TESTER!!!

function getDefaultUserType() {
    return new Promise(function (resolve, reject) {
        UserType.findOne({where: {name: 'tester'}}).then(function (userType) {
            if (userType) {
                resolve(userType);
            }
            else {
                if (userType == null) {
                    UserType.create({
                        name: 'tester',
                        description: 'базовый тип, для всех тестировщиков!'
                    }).then(function (userType) {

                        resolve(userType);

                    }, function (error) {
                        reject(error);
                    })
                }
            }

        }, function (error) {
            reject(error);
        })
    })
}


UserController.prototype.createNewUser = function (login, password, email) {
    return new Promise(function (resolve, reject) {

        getDefaultUserType().then(function (userType) {
            if (userType) {
                User.create({
                    username: login,
                    password: password,
                    email: email
                }).then(function (user) {
                    if (user) {
                        userType.addUsers(user);
                        resolve(user);
                    }
                    else {
                        reject(user);
                    }

                })
            }
        }, function (error) {
            reject(error);
        })
    })
}

UserController.prototype.login = function (login, password) {
    var error = "";

    return new Promise(function (resolve, reject) {
        User.findOne({where: {username: login, password: password}}).then(function (user) {
            if (user) {
                console.log("Find User Success" + JSON.stringify(user));
                if (user.password == password) {
                    resolve(user);
                }
                else {
                    reject('Password is not correct');
                }

            }
            else {
                if (login == 'admin') {

                    UserType.findOne({where: {name: 'admin'}}).then(function (userType) {
                        if (userType) {
                            User.create({username: 'admin', password: '1234'}).then(function (user) {
                                if (user) {
                                    userType.addUsers(user);
                                    resolve(user);
                                }
                            }, function (error) {
                                reject(error);
                            })
                        }
                    })
                }
                reject('User Not Found');
            }
        })

    })
}

UserController.prototype.registrationNewUSer = function () {


}


module.exports = new UserController();
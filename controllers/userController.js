/**
 * Created by god on 6/11/2017.
 */


var promise = require('promise');


// var uuidV1 = require('uuid/v1');

var uuid = require('node-uuid');

var UserType = require('../node_modules/.bin/models').UserType;

var User = require('../node_modules/.bin/models').User;

var LogController = require('./logController');


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
                        LogController.createNewLog('info', 'createNewUser', JSON.stringify(user)).then(function (log) {
                            resolve(user);
                        }, function (error) {
                            //TODO: FATAL ERROR!
                        })
                    }
                }).catch(function (error) {
                    LogController.createNewLog('error', 'createNewUser', JSON.stringify(error)).then(function (log) {
                        reject(error);
                    }, function (error) {
                        //TODO: FATAL ERROR!
                    })

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
                if (user && user.password == password) {

                    LogController.createNewLog('info', 'login', JSON.stringify(user)).then(function (log) {
                        resolve(user);
                    }, function (error) {
                        //TODO: FATAL ERROR!
                    })


                }
                else {
                    LogController.createNewLog('error', 'login', 'Password is not correct').then(function (log) {
                        reject('Password is not correct');
                    }, function (error) {
                        //TODO: FATAL ERROR!
                    })
                }

            }
            else {
                if (login == 'admin') {
                    UserType.findOne({where: {name: 'admin'}}).then(function (userType) {
                        if (userType) {
                            User.create({username: 'admin', password: '1234'}).then(function (user) {
                                if (user) {
                                    userType.addUsers(user);
                                    LogController.createNewLog('info', 'login', JSON.stringify(user)).then(function (log) {
                                        resolve(user);
                                    }, function (error) {
                                        //TODO: FATAL ERROR!
                                    })
                                }
                            }, function (error) {
                                LogController.createNewLog('error', 'login', JSON.stringify(error)).then(function (log) {
                                    reject(error);
                                }, function (error) {
                                    //TODO: FATAL ERROR!
                                })

                            })
                        }
                        else {
                            UserType.create({
                                name: 'admin',
                                description: 'админ Бог этой системы'
                            }).then(function (userType) {
                                User.create({username: 'admin', password: '1234'}).then(function (user) {
                                    if (user) {
                                        userType.addUsers(user);
                                        LogController.createNewLog('info', 'login', JSON.stringify(user)).then(function (log) {
                                            resolve(user);
                                        }, function (error) {
                                            //TODO: FATAL ERROR!
                                        })
                                    }
                                }, function (error) {
                                    LogController.createNewLog('error', 'login', JSON.stringify(error)).then(function (log) {
                                        reject(error);
                                    }, function (error) {
                                        //TODO: FATAL ERROR!
                                    })
                                })
                            })
                        }
                    })
                }
                else {
                    LogController.createNewLog('error', 'login', 'User Not Found: ' + 'login: ' + login + 'password' + password).then(function (log) {
                        reject('User Not Found');
                    }, function (error) {
                        //TODO: FATAL ERROR!
                    })

                }
            }
        })

    })
}

UserController.prototype.registrationNewUSer = function () {


}


module.exports = new UserController();
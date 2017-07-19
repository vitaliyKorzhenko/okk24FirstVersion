/**
 * Created by god on 6/27/2017.
 */
var promise = require('promise');

var UserType = require('../node_modules/.bin/models').UserType;

function AdminController(userType) {

}


AdminController.prototype.createUserType = function (name, description) {
    console.log('create user Type! admin controller' + name + description);

    if (name && description) {
        return new Promise(function (resolve, reject) {
            UserType.create({name: name, description: description}).then(function (userType) {
                if (userType !== null) {
                    resolve(userType);
                }

            }, function (error) {
                console.log('error create User Type' + JSON.stringify(error));
                reject(error);
            })
        })
    }
}



module.exports = new AdminController();
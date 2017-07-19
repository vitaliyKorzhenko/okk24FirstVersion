/**
 * Created by god on 7/10/2017.
 */



var promise = require('promise');


// var uuidV1 = require('uuid/v1');

var uuid = require('node-uuid');

var UserType = require('../node_modules/.bin/models').UserType;

var User = require('../node_modules/.bin/models').User;


function TesterController() {
    UserType.hasMany(User, {as: 'Users'});
}





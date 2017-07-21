/**
 * Created by god on 7/20/2017.
 */
var promise = require('promise');


// var uuidV1 = require('uuid/v1');

var uuid = require('node-uuid');



var SystemLog = require('../node_modules/.bin/models').SystemLog;



function LogController() {
    
}




LogController.prototype.getAllLogs = function () {
    
    return new Promise(function (resolve, reject) {
        SystemLog.findAndCountAll({limit:500})
            .then(function (result) {
                if (result) {
                    resolve(result)
                    console.log(result.count);
                    console.log(result.rows);
                }
            }, function (error) {
                 reject(error);
            });
    });

}



//MODEL !!!

// module.exports = function(sequelize, DataTypes) {
//     var SystemLog = sequelize.define('SystemLog', {
//         type: DataTypes.STRING,
//         actionName: DataTypes.STRING,
//         infoMessage: DataTypes.TEXT,
//         id:
//             {
//                 type: DataTypes.UUID,
//                 defaultValue: DataTypes.UUIDV1,
//                 primaryKey: true
//             },
//     }, {
//         classMethods: {
//             associate: function(models) {
//                 // associations can be defined here
//             }
//         }
//     });
//     return SystemLog;
// };


LogController.prototype.createNewLog = function (type, actionName, infoMessage) {
    console.log("CREATE NEW LOG: " + type  + actionName + infoMessage);
    return new Promise(function (resolve, reject) {
        SystemLog.create({type:type, actionName: actionName, infoMessage:infoMessage}).then(function (createdLog) {
            resolve(createdLog);
        }).catch(function (error) {
            reject(error);
        })
    })
}

module.exports = new LogController();
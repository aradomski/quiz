/*globals UserProvider : true, process : true , console: false*/

var Db = require('mongodb').Db, Connection = require('mongodb').Connection, Server = require('mongodb').Server, BSON = require('mongodb').BSON, ObjectID = require('mongodb').ObjectID;
UserProvider = function() {
    var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
    var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;

    this.db = new Db('quiz', new Server(host, port, {
        auto_reconnect : true
    }, {}));
    this.db.open(function() {
    });
};
// zwrócenie kolekcji userów z bazy
UserProvider.prototype.getCollection = function(callback) {
    this.db.collection('Users', function(error, users_collection) {
        if(error) {
            callback(error);
        } else {
            callback(null, users_collection);
        }
    });
};
// zwracanie jednego użytkownika
UserProvider.prototype.getUser = function(userName, pass, callback) {
    this.getCollection(function(error, user_collection) {
        if(error) {
            callback(error);
        } else {
            // operacje na kolekcji zwróconej z getCollection
            user_collection.findOne({
                userName : userName,
                pass : pass
            }, function(error, result) {
                if(error) {
                    callback(error);
                } else {
                    console.log("Loguje użytkownika " + result);
                    callback(null, result);
                }
            });
        }
    });
};
//zwracanie wszystkich userów
UserProvider.prototype.getAllUsers = function(callback) {
    this.getCollection(function(error, users_collection) {
        if(error) {
            callback(error);
        } else {
            users_collection.find().toArray(function(error, results) {
                if(error) {
                    callback(error);
                } else {
                    callback(null, results);
                }
            });
        }
    });
};
// sprawdzanie czy login juz istnieje
UserProvider.prototype.findLogin = function(userName, callback) {
    this.getCollection(function(error, user_collection) {
        if(error) {
            callback(error);
        } else {
            // operacje na kolekcji zwróconej z getCollection
            user_collection.findOne({
                userName : userName
            }, function(error, result) {
                if(error) {
                    callback(error);
                } else {
                    console.log("szukam loginu " + result);
                    callback(null, result);
                }
            });
        }
    });
};
// dodawanie do bazy, argument to obiekt i funkcja
UserProvider.prototype.save = function(users, callback) {
    this.getCollection(function(error, user_collection) {
        var i = 0, user;
        if(error) {
            callback(error);
        } else {
            if( typeof users.length === "undefined") {
                users = [users];
            }
            for( i = 0; i < users.length; i++) {
                user = users[i];
                user.created_at = new Date();
            }

            user_collection.insert(users, function() {
                callback(null, users);
            });
        }
    });
};

exports.UserProvider = UserProvider;
/*
 exports.login_ajax_provider = function(req, res) {
 login = req.body.userName || 'None';
 pass = req.body.pass || 'None';
 var mongo = require('mongodb'), server = new mongo.Server('localhost', 27017, {
 auto_reconnect : true
 }), db = new mongo.Db('quiz', server, {}), logged = db.Users.find({
 userName : login,
 pass : pass
 });

 console.log(login);
 console.log(pass);

 if(logged) {
 res.render('logged', {
 layout : false,
 userName : login,
 pass : pass
 });
 } else {
 res.render('loginForm', {
 layout : false,
 error : true
 });
 }

 }*/
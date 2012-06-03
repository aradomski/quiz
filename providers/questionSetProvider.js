/*jslin node: true*/
/*globals QuestionSetProvider: true, console : false , MONGO_NODE_DRIVER_HOST: false*/

var Db = require('mongodb').Db, Connection = require('mongodb').Connection, Server = require('mongodb').Server, BSON = require('mongodb').BSON, ObjectID = require('mongodb').ObjectID;
QuestionSetProvider = function() {
    var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
    var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;

    this.db = new Db('quiz', new Server(host, port, {
        auto_reconnect : true
    }, {}));
    this.db.open(function() {
    });
};
// zwrócenie kolekcji pytan z bazy
QuestionSetProvider.prototype.getCollection = function(callback) {
    this.db.collection('QuestionsSet', function(error, questionsSet_collection) {
        if(error) {
            callback(error);
        } else {
            callback(null, questionsSet_collection);
        }
    });
};
// zwracanie jednego pytania
QuestionSetProvider.prototype.getQuestionSet = function(id, callback) {
    this.getCollection(function(error, questionSet_collection) {
        var string = 'ObjectId("' + id + '")', object_id;
        // var string = id;
        // console.log("id set = " + id);
        object_id = new ObjectID(id);
        console.log("object id = " + object_id + "id" + id);
        if(error) {
            callback(error);
        } else {
            // operacje na kolekcji zwróconej z getCollection
            questionSet_collection.findOne({
                "_id" : object_id
            }, function(error, result) {
                if(error) {
                    callback(error);
                } else {
                    console.log("Znajduje set o id: " + string + " o tresci: " + result.name);
                    callback(null, result);
                }
            });
        }
    });
};
//zwracanie wszystkich zestawów pytan
QuestionSetProvider.prototype.getAllQuestionsSet = function(callback) {
    this.getCollection(function(error, questionsSet_collection) {
        if(error) {
            callback(error);
        } else {
            questionsSet_collection.find().toArray(function(error, results) {
                if(error) {
                    callback(error);
                } else {
                    callback(null, results);
                }
            });
        }
    });
};
// dodawanie do bazy, argument to obiekt i funkcja
QuestionSetProvider.prototype.save = function(questionsSet, callback) {
    this.getCollection(function(error, questionSet_collection) {
        var i = 0, questionSet;
        if(error) {
            callback(error);
        } else {
            if( typeof questionsSet.length === "undefined") {
                questionsSet = [questionsSet];
            }
            for( i = 0; i < questionsSet.length; i++) {
                questionSet = questionsSet[i];
                questionSet.created_at = new Date();
            }

            questionSet_collection.insert(questionsSet, function() {
                callback(null, questionsSet);
            });
        }
    });
};

exports.QuestionSetProvider = QuestionSetProvider;

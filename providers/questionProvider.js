var Db = require('mongodb').Db, Connection = require('mongodb').Connection, Server = require('mongodb').Server, BSON = require('mongodb').BSON, ObjectID = require('mongodb').ObjectID;
QuestionProvider = function() {
    var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
    var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;

    this.db = new Db('quiz', new Server(host, port, {
        auto_reconnect : true
    }, {}));
    this.db.open(function() {
    });
};
// zwrócenie kolekcji pytan z bazy
QuestionProvider.prototype.getCollection = function(callback) {
    this.db.collection('Questions', function(error, questions_collection) {
        if(error)
            callback(error);
        else
            callback(null, questions_collection);
    });
};
// zwracanie jednego pytania
QuestionProvider.prototype.getQuestion = function(userName, pass, callback) {
    this.getCollection(function(error, question_collection) {
        if(error)
            callback(error)
        else {
            // operacje na kolekcji zwróconej z getCollection
            question_collection.findOne({
                _id : _id
            }, function(error, result) {
                if(error) {
                    callback(error);
                } else {
                    console.log("Znajduje pytanie " + result);
                    callback(null, result)
                }
            });
        }
    });
};
//zwracanie wszystkich userów
QuestionProvider.prototype.getAllQuestions = function(callback) {
    this.getCollection(function(error, questions_collection) {
        if(error) {
            callback(error);
        } else {
            questions_collection.find().toArray(function(error, results) {
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
QuestionProvider.prototype.save = function(questions, callback) {
    this.getCollection(function(error, question_collection) {
        var i = 0;
        if(error) {
            callback(error);
        } else {
            if( typeof questions.length === "undefined") {
                questions = [questions];
            }
            for( i = 0; i < questions.length; i++) {
                question = questions[i];
                question.created_at = new Date();
            }

            question_collection.insert(questions, function() {
                callback(null, questions);
            });
        }
    });
};

exports.QuestionProvider = QuestionProvider;

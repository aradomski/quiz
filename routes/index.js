/*jslint browser: true, devel: true, sloppy: true  */
/*globals $: false, jConfirm: false, jAlert: false , io : false, window: false, require : false, exports: false */
var UserProvider = require('../providers/userProvider').UserProvider, userProvider = new UserProvider(), QuestionProvider = require('../providers/questionProvider').QuestionProvider, questionProvider = new QuestionProvider(), title = 'You shall not pass!', welcomeText = "Witam wszystkich na kole. Kto pierwszy ten lepszy! ";

exports.home = function(req, res) {
    res.render('index', {
        myParams : {
            title : title,
            displayQuestion : false,
            welcomeText : welcomeText
        }
    });
};
// exports.logout = function(req, res) {
// delete req.session.userName;
// delete req.session.userId;
// };
exports.login = function(req, res) {
    userProvider.getUser(req.param('userName'), req.param('pass'), function(error, user) {
        if(user) {
            var userName = req.param('userName');
            req.session.userName = userName;
            req.session.userId = user._id;

            if(user.isAdmin !== undefined) {
                req.session.isAdmin = user.isAdmin;
            }

            // var io = require('socket.io');
            // io.sockets.broadcast.emit('userLoggedIn', userName, user._id);
            res.render('loginForm', {
                layout : false,
                myParams : {
                    userName : user.userName,
                    id : user._id,
                    error : false
                }
            });
        } else {
            res.render('loginForm', {
                layout : false,
                myParams : {
                    error : true
                }
            });
        }
    });
};

exports.answer = function(req, res) {
    if(req.session.userName) {
        var anwser = req.param("answer"), userName = req.session.userName;
        res.send("Użytkownik: " + userName + " odpowiedział: " + anwser);
    } else {
        res.send("nikt nie został zalogowany jeszcze");
    }
};

exports.getQuestionById = function(req, res) {
    questionProvider.getQuestion(req.param('questionId'), function(error, question) {
        if(question) {
            res.render('quizForm', {
                layout : false,
                myParams : {
                    title : title,
                    displayQuestion : false,
                    question : question.question,
                    a : question.a,
                    b : question.b,
                    c : question.c,
                    d : question.d
                }
            });
        } else {
            res.send({
                myParams : {
                    error : true
                }
            });
        }
    });
};

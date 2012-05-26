/*
 * GET home page.
 */

var UserProvider = require('../providers/userProvider').UserProvider;
var userProvider = new UserProvider();

var QuestionProvider = require('../providers/questionProvider').QuestionProvider;
var questionProvider = new QuestionProvider();

var longLI = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra, nunc ac lacinia varius, nisl elit vehicula nisl, a aliquet quam ante eleifend magna. Etiam pretium, enim non cursus auctor, lacus felis ornare nulla, sit amet mattis neque neque a urna. Ut et quam lacinia diam vestibulum laoreet. Nunc vel lacus sit amet mi molestie ultrices. Fusce sollicitudin tempus dui sit amet sodales. Mauris condimentum commodo ipsum, lacinia consectetur turpis rhoncus suscipit. Sed mattis lacinia magna, et pulvinar urna bibendum eget.';
var title = 'You shall not pass!';
var shortLI = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse blandit.';
var welcomeText = 'Nie zdacie, nie macie żadnych szans. Najlepiej już odkładajcie na warunki';

exports.home = function(req, res) {
    res.render('index', {
        myParams : {
            title : title,
            shortLoremIpsum : shortLI,
            longLoremIpsum : longLI,
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

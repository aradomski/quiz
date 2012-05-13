var UserProvider = require('../providers/userProvider').UserProvider;
var userProvider = new UserProvider();

var QuestionProvider = require('../providers/questionProvider').QuestionProvider;
var questionProvider = new QuestionProvider();

exports.admin = function(req, res) {
    if(req.session.userName === "Adam") {
        res.render('admin/adminIndex', {
            layout : false
        });
    }
};

exports.register = function(req, res) {
    var userName = req.param('userName'), pass = req.param('pass');
    // console.log(userName);
    if(userName === undefined || pass === undefined) {
        res.render('admin/register', {
            layout : false,
            myParams : {
                exist : false
            }
        });
    } else {
        userProvider.findLogin(userName, function(error, userExist) {
            if(!userExist) {
                userProvider.save({
                    userName : userName,
                    pass : pass
                }, function(error, user) {
                    if(user) {
                        res.send("Pomyślnie zarejestrowano użytkownika");
                    } else {
                        res.render('register', {
                            layout : false,
                            myParams : {
                                error : true
                            }
                        });
                    }
                });
            } else {
                res.render('admin/register', {
                    layout : false,
                    myParams : {
                        exist : true
                    }
                });
            }
            console.log(error);
        });
    }
};

exports.users = function(req, res) {
    if(req.session.userName === "Adam") {
        userProvider.getAllUsers(function(error, users) {
            if(users) {
                //  console.log(users);
                res.render('admin/userManager', {
                    layout : false,
                    myParams : {
                        users : users
                    }
                });
            } else {
                res.send("error");
            }
        });
    }
};

exports.usersTable = function(req, res) {
    if(req.session.userName === "Adam") {
        userProvider.getAllUsers(function(error, users) {
            if(users) {//  console.log(users);
                res.render('admin/usersTable', {
                    layout : false,
                    myParams : {
                        users : users
                    }
                });
            } else {
                res.send("error");
            }
        });
    }
};

exports.usersJSON = function(req, res) {
    var i, aaData = [], row, data = [];

    if(req.session.userName === "Adam") {
        userProvider.getAllUsers(function(error, users) {
            if(users) {
                // console.log(questions);

                for(var i = 0; i < users.length; i++) {
                    row = [users[i].userName, users[i].pass, users[i].created_at, users[i]._id];
                    data.push(row);
                }
                aaData = {
                    "aaData" : data
                };
                res.send(aaData);
            } else {
                res.send("error");
            }
        });
    }
};

exports.questions = function(req, res) {
    if(req.session.userName === "Adam") {
        questionProvider.getAllQuestions(function(error, questions) {
            if(questions) {//  console.log(users);
                res.render('admin/questionManager', {
                    layout : false,
                    myParams : {
                        questions : questions
                    }
                });
            } else {
                res.send("error");
            }
        });
    } else {
        res.send("Nie prawidłowy użytkownik");
    }
};

exports.questionsTable = function(req, res) {
    if(req.session.userName === "Adam") {
        questionProvider.getAllQuestions(function(error, questions) {
            if(questions) {//  console.log(users);
                res.render('admin/questionsTable', {
                    layout : false,
                    myParams : {
                        questions : questions
                    }
                });
            } else {
                res.send("error");
            }
        });
    } else {
        res.send("Nie prawidłowy użytkownik");
    }
};

exports.questionsJSON = function(req, res) {
    var i, aaData = [], row, data = [];

    if(req.session.userName === "Adam") {
        questionProvider.getAllQuestions(function(error, questions) {
            if(questions) {
                // console.log(questions);

                for(var i = 0; i < questions.length; i++) {
                    row = [questions[i].question, questions[i].a, questions[i].b, questions[i].c, questions[i].d, questions[i].correct, questions[i].created_at, questions[i]._id];
                    data.push(row);
                }
                aaData = {
                    "aaData" : data
                };
                res.send(aaData);
            } else {
                res.send("error");
            }
        });
    } else {
        res.send("Nie prawidłowy użytkownik");
    }
};

exports.addQuestion = function(req, res) {
    var question = req.param('question'), a = req.param('a'), b = req.param('b'), c = req.param('c'), d = req.param('d'), correct = req.param('correct');

    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
    console.log(question);
    console.log(correct);
    if(question === undefined || a === undefined || b === undefined || c === undefined || d === undefined || correct === undefined) {
        res.render('admin/addQuestion', {
            layout : false,
            myParams : {
                error : false
            }
        });
    } else {
        questionProvider.save({
            question : question,
            a : a,
            b : b,
            c : c,
            d : d,
            correct : correct
        }, function(error, question) {
            if(question) {
                res.send("Pomyślnie dodano pytanie");
            } else {
                res.render('admin/addQuestion', {
                    layout : false,
                    myParams : {
                        error : true
                    }
                });
            }
        });
    }
};

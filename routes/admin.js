/*jslint browser: true, devel: true, sloppy: true  */
/*globals $: false, jConfirm: false, jAlert: false , io : false, window: false, require : false, exports: false */
var UserProvider = require('../providers/userProvider').UserProvider,
    userProvider = new UserProvider(),
    QuestionProvider = require('../providers/questionProvider').QuestionProvider,
    questionProvider = new QuestionProvider(),
    boss = "Adam",
    tableStringLenght = 40;

exports.admin = function (req, res) {
    if (req.session.userName === boss) {
        res.render('admin/adminIndex', {
            layout: false
        });
    } else {
        res.send("Brak uprawnien");
    }
};

exports.register = function (req, res) {
    if (req.session.userName === boss) {
        var userName = req.param('userName'),
            pass = req.param('pass');
        // console.log(userName);
        if (userName === undefined || pass === undefined) {
            res.render('admin/register', {
                layout: false,
                myParams: {
                    exist: false
                }
            });
        } else {
            userProvider.findLogin(userName, function (error, userExist) {
                if (!userExist) {
                    userProvider.save({
                        userName: userName,
                        pass: pass
                    }, function (error, user) {
                        if (user) {
                            res.send("Pomyślnie zarejestrowano użytkownika");
                        } else {
                            res.render('register', {
                                layout: false,
                                myParams: {
                                    error: true
                                }
                            });
                        }
                    });
                } else {
                    res.render('admin/register', {
                        layout: false,
                        myParams: {
                            exist: true
                        }
                    });
                }
                console.log(error);
            });
        }
    } else {
        res.send("Brak uprawnien");
    }
};

exports.users = function (req, res) {
    if (req.session.userName === boss) {
        userProvider.getAllUsers(function (error, users) {
            if (users) {
                //  console.log(users);
                res.render('admin/userManager', {
                    layout: false,
                    myParams: {
                        users: users
                    }
                });
            } else {
                res.send("error");
            }
        });
    }
};

exports.usersTable = function (req, res) {
    if (req.session.userName === boss) {
        userProvider.getAllUsers(function (error, users) {
            if (users) { //  console.log(users);
                res.render('admin/usersTable', {
                    layout: false,
                    myParams: {
                        users: users
                    }
                });
            } else {
                res.send("error");
            }
        });
    }
};

exports.usersJSON = function (req, res) {
    var i, aaData = [],
        row, data = [];

    if (req.session.userName === boss) {
        userProvider.getAllUsers(function (error, users) {
            if (users) {
                // console.log(questions);
                for (i = 0; i < users.length; i += 1) {
                    row = {
                        "0": users[i].userName,
                        "1": users[i].pass,
                        "2": users[i].created_at,
                        "DT_RowId": users[i]._id
                    };
                    data.push(row);
                }
                aaData = {
                    "aaData": data
                };
                res.send(aaData);
            } else {
                res.send("error");
            }
        });
    } else {
        res.send("Brak uprawnien");
    }
};

exports.questions = function (req, res) {
    if (req.session.userName === boss) {
        questionProvider.getAllQuestions(function (error, questions) {
            if (questions) { //  console.log(users);
                res.render('admin/questionManager', {
                    layout: false,
                    myParams: {
                        questions: questions
                    }
                });
            } else {
                res.send("error");
            }
        });
    } else {
        res.send("Brak uprawnien");
    }
};

exports.questionsTable = function (req, res) {
    if (req.session.userName === boss) {
        questionProvider.getAllQuestions(function (error, questions) {
            if (questions) { //  console.log(users);
                res.render('admin/questionsTable', {
                    layout: false,
                    myParams: {
                        questions: questions
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

exports.questionsJSON = function (req, res) {
    var i, aaData = [],
        row, data = [];

    if (req.session.userName === boss) {
        questionProvider.getAllQuestions(function (error, questions) {
            if (questions) {
                // console.log(questions);
                for (i = 0; i < questions.length; i += 1) {
                    row = {
                        "0": questions[i].question.substring(0, tableStringLenght),
                        "1": questions[i].a,
                        "2": questions[i].b,
                        "3": questions[i].c,
                        "4": questions[i].d,
                        "5": questions[i].correct,
                        "6": questions[i].created_at,
                        "DT_RowId": questions[i]._id
                    };
                    data.push(row);
                }
                aaData = {
                    "aaData": data
                };
                res.send(aaData);
            } else {
                res.send("error");
            }
        });
    } else {
        res.send("Brak uprawnien");
    }
};

exports.addQuestion = function (req, res) {
    if (req.session.userName === boss) {
        var question = req.param('question'),
            a = req.param('a'),
            b = req.param('b'),
            c = req.param('c'),
            d = req.param('d'),
            correct = req.param('correct');

        console.log(a);
        console.log(b);
        console.log(c);
        console.log(d);
        console.log(question);
        console.log(correct);
        if (question === undefined || a === undefined || b === undefined || c === undefined || d === undefined || correct === undefined) {
            res.render('admin/addQuestion', {
                layout: false,
                myParams: {
                    error: false
                }
            });
        } else {
            questionProvider.save({
                question: question,
                a: a,
                b: b,
                c: c,
                d: d,
                correct: correct
            }, function (error, question) {
                if (question) {
                    res.send("Pomyślnie dodano pytanie");
                } else {
                    res.render('admin/addQuestion', {
                        layout: false,
                        myParams: {
                            error: true
                        }
                    });
                }
            });
        }
    } else {
        res.send("Brak uprawnien");
    }
};
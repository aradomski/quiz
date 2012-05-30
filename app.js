/*jslint node: true, sloppy: true */
/*global module: false, __dirname: false, console: false */
/**
 * Module dependencies.
 */
var express = require('express'), handlers = require('./routes'), UserProvider = require('./providers/userProvider').UserProvider, adminHandlers = require('./routes/admin.js'), QuestionProvider = require('./providers/questionProvider').QuestionProvider, questionProvider = new QuestionProvider(), MongoStore = require('connect-mongo')(express), mongo = require('mongoose'), io = require('socket.io'), fs = require('fs'), app = module.exports = express.createServer(), io = io.listen(app), userProvider = new UserProvider();

// Configuration
app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.logger());
    app.use(express.cookieParser());

    app.use(express.session({
        secret : 'topsecret',
        maxAge : new Date(Date.now() + 3600000),
        store : new MongoStore({
            host : 'localhost',
            port : 27017,
            db : 'quiz',
            collection : 'sessions'
        })
    }));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.dynamicHelpers({
    session : function(req, res) {
        return req.session;
    }
});

app.configure('development', function() {
    app.use(express.errorHandler({
        dumpExceptions : true,
        showStack : true
    }));
});

app.configure('production', function() {
    app.use(express.errorHandler());
});
// Routes
app.get('/', handlers.home);

app.post('/login', handlers.login);

// app.get('/logout', handlers.logout);

app.post('/answer', handlers.answer);

app.post('/admin', adminHandlers.admin);

app.post('/users', adminHandlers.users);
app.get('/usersTable', adminHandlers.usersTable);
app.get('/usersJSON', adminHandlers.usersJSON);
app.get('/register', adminHandlers.register);

app.post('/questions', adminHandlers.questions);
app.get('/questionsTable', adminHandlers.questionsTable);
app.get('/questionsJSON', adminHandlers.questionsJSON);
app.get('/addQuestion', adminHandlers.addQuestion);
app.get('/getQuestionById', handlers.getQuestionById);

app.post('/questionsSet', adminHandlers.questionsSet);
app.get('/questionsSetTable', adminHandlers.questionsSetTable);
app.get('/questionsSetJSON', adminHandlers.questionsSetJSON);
app.get('/addQuestionSet', adminHandlers.addQuestionSet);
app.get('/getQuestionSetById', handlers.getQuestionSetById);

app.listen(1221);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

var interval;
var sendFunction = function(time, socket) {
    var timer = time * 60;
    interval = setInterval(function() {
        socket.broadcast.emit('timeUpdate', timer);
        timer -= 1;
        console.log(timer);
        if(timer === 0) {
            clearInterval(interval);
            socket.broadcast.emit('endQuestion');
        }
    }, 1000);
};

io.sockets.on('connection', function(socket) {
    socket.on('startQuestion', function(id, time) {
        // console.log("id === " + id);
        socket.broadcast.emit('question', id);
        sendFunction(time, socket);
    });
    socket.on('loggedIn', function(userName, userId) {
        socket.broadcast.emit('userLoggedIn', userName, userId);
    });

    socket.on('answerQuestion', function(userId, userName, anwserSet) {
        var correct, i = 0;

        console.log(anwserSet.qID + "  " + anwserSet.answer);
        questionProvider.getQuestion(anwserSet.qID, function(error, question) {
            if(question.correct === anwserSet.answer) {
                console.log("prawda");
                correct = true;
                socket.broadcast.emit('endQuestion', anwserSet.qID);
                // clearInterval(interval);
                anwserSet.correct = true;
            } else {
                console.log("nie");
                correct = false;
                anwserSet.correct = false;
            }
            console.log(anwserSet);
            socket.broadcast.emit('userAnwsered', userName, userId, anwserSet);
        });
    });
    socket.on('egzamResult', function(userId, result) {
        socket.broadcast.emit('result', userId, result);
    });
});

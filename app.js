/*jslint node: true */
/*global module: false, __dirname: false, console: false */
/**
 * Module dependencies.
 */

var express = require('express'), handlers = require('./routes'), UserProvider = require('./providers/userProvider').UserProvider, adminHandlers = require('./routes/admin.js');

var mongoStore = require('connect-mongo')(express), mongo = require('mongoose');

var io = require('socket.io'), fs = require('fs');

var app = module.exports = express.createServer(), io = io.listen(app);

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
        store : new mongoStore({
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
//Providers

var userProvider = new UserProvider();

// Routes

app.get('/', handlers.home);

app.post('/login', handlers.login);

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

app.listen(1221);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

io.sockets.on('connection', function(socket) {
    socket.on('startQuestion', function(data) {
        var myData = data;
        console.log(myData + "  =======  " + data);
        socket.broadcast.emit('question', myData);
    });
});

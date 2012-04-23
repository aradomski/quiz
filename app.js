/*jslint node: true */
/**
 * Module dependencies.
 */

var express = require('express'), handlers = require('./routes'), UserProvider = require('./providers/userProvider').UserProvider;

var mongoStore = require('connect-mongo')(express), mongo = require('mongoose');

var app = module.exports = express.createServer();

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

app.post('/register', handlers.register);

app.get('/maslo', handlers.maslo);

app.get('/bla', function(req, res) {
    var body = '';
    if(req.session.views) {++req.session.views;
    } else {
        req.session.views = 1;
        body += '<p>First time visiting? view this page in several browsers :)</p>';
    }
    res.send(body + '<p>viewed <strong>' + req.session.views + '</strong> times.</p>');
});

app.listen(1221);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

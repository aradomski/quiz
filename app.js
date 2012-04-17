/**
 * Module dependencies.
 */

var express = require('express'), handlers = require('./routes'), UserProvider = require('./providers/userProvider').UserProvider;

var app = module.exports = express.createServer();

// Configuration

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({
        secret : 'your secret here'
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

app.listen(1221);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

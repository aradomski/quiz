/**
 * Module dependencies.
 */

var express = require('express'), handlers = require('./routes'), UserProvider = require('./providers/userProvider').UserProvider;

var app = module.exports = express.createServer();

// Configuration

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
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

app.post('/login', function(req, res) {
    userProvider.getUser(req.param('userName'), req.param('pass'), function(error, user) {
        if(user) {
            res.render('logged', {
                layout : false,
                myParams : {
                    userName : user.userName
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
});

app.post('/register', function(req, res) {
    userProvider.save({
        userName : req.param('userName'),
        pass : req.param('pass')
    }, function(error, user) {
        if(user) {
            res.send("Pomyślnie zarejestrowano użytkownika");
        } else {
            res.render('register', {
                layout : false,
                myParams : {
                    error : true
                }
            })
        }
    });
});

app.listen(1221);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

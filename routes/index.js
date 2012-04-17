/*
 * GET home page.
 */

var UserProvider = require('../providers/userProvider').UserProvider;
var userProvider = new UserProvider();

var longLI = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra, nunc ac lacinia varius, nisl elit vehicula nisl, a aliquet quam ante eleifend magna. Etiam pretium, enim non cursus auctor, lacus felis ornare nulla, sit amet mattis neque neque a urna. Ut et quam lacinia diam vestibulum laoreet. Nunc vel lacus sit amet mi molestie ultrices. Fusce sollicitudin tempus dui sit amet sodales. Mauris condimentum commodo ipsum, lacinia consectetur turpis rhoncus suscipit. Sed mattis lacinia magna, et pulvinar urna bibendum eget.';
var title = 'You shall not pass!';
var shortLI = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse blandit.';

exports.home = function(req, res) {
    res.render('index', {
        myParams : {
            title : title,
            shortLoremIpsum : shortLI,
            longLoremIpsum : longLI
        }
    });
};

exports.login = function(req, res) {
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
};

exports.register = function(req, res) {
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
            });
        }
    });
};
/*
 exports.ajax_handler = function(req, res){
 var param = req.params.param;
 console.log("partial render");
 res.render('partial',  {layout: false, param: param});
 }*/
/*
 exports.pageNotFoundHandler = function(req, res){
 res.render('404', { title: 'File not Found', status:404 });
 }*/
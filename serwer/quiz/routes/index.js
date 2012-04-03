
/*
 * GET home page.
 */

var longLI = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra, nunc ac lacinia varius, nisl elit vehicula nisl, a aliquet quam ante eleifend magna. Etiam pretium, enim non cursus auctor, lacus felis ornare nulla, sit amet mattis neque neque a urna. Ut et quam lacinia diam vestibulum laoreet. Nunc vel lacus sit amet mi molestie ultrices. Fusce sollicitudin tempus dui sit amet sodales. Mauris condimentum commodo ipsum, lacinia consectetur turpis rhoncus suscipit. Sed mattis lacinia magna, et pulvinar urna bibendum eget.';
var title = 'You shall not pass!';
var shortLI = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse blandit.';

/*
exports.index = function(req, res){
  res.render('index', { title: title, shortLoremIpsum: shortLI, longLoremIpsum: longLI})
};
*/

// handler for form submitted from homepage
exports.home_post_handler = function(req, res) {
    // if the answer is not submitted, give it a default of "None"
	answer = req.body.answer || 'None';
    console.log(answer);
    // store the answer as a session variable
    req.session.answer = answer;
    // redirect the user to homepage
    res.redirect('/');
};

exports.home = function(req, res){
	if (typeof req.session.answer === undefined){
		res.render('index', { title: 'Ninja Store', shortLoremIpsum: shortLI, longLoremIpsum: longLI});
	} else {
		res.render('index', { title: title, shortLoremIpsum: shortLI, longLoremIpsum: longLI});
	}
};
exports.ajax_handler = function(req, res){
	var param = req.params.param;
	console.log("partial render");
	res.render('partial',  {layout: false, param: param});
}

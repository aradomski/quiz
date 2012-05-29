/*jslint browser: true, devel: true, sloppy: true */
/*globals $: false, jConfirm: false, jAlert: false , io : false  */
/*Zaznacznie odpowiedzi */
$(document).on("click", "#answerBlock li", function() {
    if($(this).attr('class') === 'answer') {
        $("#answerBlock .answerChecked").attr('class', 'answer');
        $(this).attr('class', 'answerChecked');
        $(this).children(":first").attr('checked', true);
    } else {
        $(this).attr('class', 'answer');
        $(this).children(":first").attr('checked', false);
    }
});
var createQForm = function(question, currNum, lenght) {
    var questionText = question.question, a = question.a, b = question.b, c = question.c, d = question.d, id = question._id, root = $("#quiz");

    // alert(questionText + " " + a + b + c + d + " id = " + id);
    root.html("");
    root.append("<p>" + questionText + "</p>");
    root.append("<ul id='answerBlock' name='" + id + "'>");
    root.append("<li id='answerA' class='answer'> <input type='radio' name='answer' value='A' class='radioAnswer'><h1 class='answerH1'>A</h1><span class='answerSpan'>" + a + "</span></li>");
    root.append("<li id='answerB' class='answer'> <input type='radio' name='answer' value='B' class='radioAnswer'><h1 class='answerH1'>B</h1><span class='answerSpan'>" + b + "</span></li>");
    root.append("<li id='answerC' class='answer'> <input type='radio' name='answer' value='C' class='radioAnswer'><h1 class='answerH1'>C</h1><span class='answerSpan'>" + c + "</span></li>");
    root.append("<li id='answerD' class='answer'> <input type='radio' name='answer' value='D' class='radioAnswer'><h1 class='answerH1'>D</h1><span class='answerSpan'>" + d + "</span></li>");
    root.append("</ul>");
};
/*Logowanie*/
$(document).on("click", "#loginButton", function(e) {
    e.preventDefault();
    var pass = $("#loginStatus #loginPass").val(), userName = $("#loginStatus #loginUserName").val();
    //alert(pass);
    //alert(userName);
    if(pass !== "" && userName !== "") {
        $.ajax({
            type : "post",
            dataType : "html",
            context : document.html,
            url : "/login/",
            data : "userName=" + userName + "&pass=" + pass,
            timeout : 2500,
            cache : false,
            success : function(html) {
                //location.hash = 'foo';
                $('#loginStatus').html(html);
            },
            error : function() {
                //    $('#loginStatus').text('error');
                jAlert('<img src="images/failure.jpg" width="500" height="375" alt="Ajax login error"/>', 'Division by zero error!');
            }
        });
    } else {
        if(pass === "") {
            jAlert('<img src="images/emptyfield.jpg" width="500" height="310" alt="Empty field"/><br> Brak hasła.', 'U r doing it wrong!');
        }
        if(userName === "") {
            jAlert('<img src="images/emptyfield.jpg" width="500" height="310" alt="Empty field"/><br> Brak nazwy użytkownika.', 'U r doing it wrong!');
        }
    }
});
/*AFTER END SCRIPTS*/

$(document).on("click", "#problem", function(e) {
    jAlert('<h1>Test już się skończył</h1><br /><img src="images/mad.jpg" width="500" height="310" alt="U mad?"/>', 'U mad?');
});

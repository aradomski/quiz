/*jslint browser: true, devel: true, sloppy: true */
/*globals $: false, jConfirm: false, jAlert: false , io : false, SET : true  */

var sendSet = {}, questionsAnwsers = [], findAndRemove, createQForm;

/*Zaznacznie odpowiedzi */
$(document).on("click", "#answerBlock li", function() {
    var answer, qID, currNum = parseInt($("#currNum").text());
    //zaznaczanie
    if($(this).attr('class') === 'answer') {
        $("#answerBlock .answerChecked").attr('class', 'answer');
        $(this).attr('class', 'answerChecked');
        $(this).children(":first").attr('checked', true);
        answer = $(this).find(".answerH1").text();
        qID = $("#answerBlock").attr("name");
        findAndRemove(questionsAnwsers, qID);
        questionsAnwsers.push({
            qID : qID,
            answer : answer,
            qNum : currNum,
            ilosc : SET.set.length
        });
    }
    //odznaczanie
    else {
        qID = $("#answerBlock").attr("name");
        $(this).attr('class', 'answer');
        $(this).children(":first").attr('checked', false);
        findAndRemove(questionsAnwsers, qID);
    }

});
findAndRemove = function(array, value) {
    var i;
    for( i = 0; i < array.length; i += 1) {
        if(array[i].qID === value) {
            array.splice(i, 1);
            break;
        }
    }
};
/*Tworzenie formularza odpowiedzi */
createQForm = function(question, currNum, lenght) {
    // alert("asda");
    lenght -= 1;
    var questionText = question.question, a = question.a, b = question.b, c = question.c, d = question.d, id = question._id, anwsered = question.anwsered, root = $("#quiz"), i, qAnwsered;

    // alert(questionText + " " + a + b + c + d + " id = " + id);
    root.html("");
    root.html("<p>" + questionText + "</p>" + "<ul id='answerBlock' name='" + id + "'>" + "<li id='answerA' class='answer'> <input type='radio' name='answer' value='A' class='radioAnswer'><h1 class='answerH1'>A</h1><span class='answerSpan'>" + a + "</span></li>" + "<li id='answerB' class='answer'> <input type='radio' name='answer' value='B' class='radioAnswer'><h1 class='answerH1'>B</h1><span class='answerSpan'>" + b + "</span></li>" + "<li id='answerC' class='answer'> <input type='radio' name='answer' value='C' class='radioAnswer'><h1 class='answerH1'>C</h1><span class='answerSpan'>" + c + "</span></li>" + "<li id='answerD' class='answer'> <input type='radio' name='answer' value='D' class='radioAnswer'><h1 class='answerH1'>D</h1><span class='answerSpan'>" + d + "</span></li>" + "</ul>");

    for( i = 0; i < questionsAnwsers.length; i += 1) {
        if(questionsAnwsers[i].qID === id) {
            qAnwsered = true;
        }
    }
    if(qAnwsered !== true) {
        root.append("  <button id='giveAnswer' >Wyślij</button> <br />");
    } else {
        root.append("To pytanie nie jest już dostępne!<br />");
    }
    root.append("<button id='prev'>Poprzednie </button>");

    root.append("<b id='currNum'>" + currNum + "</b>/<b>" + lenght + "</b>");

    root.append("<button id='next'>Następne </button>");
};
/*PRzechodzenie miedzy pytaniami */
$(document).on("click", "#next", function() {
    var currNum = parseInt($("#currNum").text()), qNum;
    if((currNum + 1) < SET.set.length) {
        qNum = currNum + 1;
    } else {
        qNum = 0;
    }
    createQForm(SET.set[qNum], qNum, SET.set.length);
});
$(document).on("click", "#prev", function() {
    var currNum = parseInt($("#currNum").text()), qNum;
    if((currNum - 1 ) >= 0) {
        qNum = currNum - 1;
    } else {
        qNum = SET.set.length - 1;
    }
    createQForm(SET.set[qNum], qNum, SET.set.length);
});
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
//Wylogowanie
$(document).on("click", "#logout", function() {
    $.ajax({
        type : "post",
        dataType : "html",
        context : document.html,
        url : "/logout",
        timeout : 2500,
        cache : false,
        success : function(html) {
            //location.hash = 'foo';
            $('#loginStatus').remove();
            $('#leftMenu').append("<section id='loginStatus'> <b>Login:</b><form><input id='loginUserName' type='text' name='userName'> <br><b>Haslo:</b><br /><input id='loginPass' type='password' name='pass'><button id='loginButton'>Zaloguj</button></form></section>");
        },
        error : function() {
            //    $('#loginStatus').text('error');
            jAlert('<img src="images/failure.jpg" width="500" height="375" alt="Ajax login error"/>', 'Division by zero error!');
        }
    });
});
/*AFTER END SCRIPTS*/

$(document).on("click", "#problem", function(e) {
    jAlert('<h1>Test już się skończył</h1><br /><img src="images/mad.jpg" width="500" height="310" alt="U mad?"/>', 'U mad?');
});

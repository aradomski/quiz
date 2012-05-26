/*jslint browser: true, devel: true, sloppy: true  */
/*globals $: false, jConfirm: false, jAlert: false , io : false, window: false */

/*COMETY*/

var socket = io.connect(window.location), question_id, egzamPassed, egzamFailed;

$(document).ready(function() {
    var userName = $("#userName").text(), userId = $("#userId").text();
    socket.emit('loggedIn', userName, userId);
    // alert(userName + "," + userId);
});
/*Wysyłanie odpowiedzi*/
$(document).on("click", "#giveAnswer", function() {
    var answer = $("input[name='answer']:checked").val(), userId = $("#userId").text(), userName = $("#userName").text();
    if(answer !== undefined) {
        jConfirm('Wysłać odpowiedź?', 'I tak nie zdasz....', function(r) {
            if(r === true) {
                socket.emit('answerQuestion', userId, userName, question_id, answer);
                $("#zegarek").html("KONIEC!!!");
                $("#giveAnswer").hide();
                $("#problem").show();
            } else {
                jAlert('I co myślisz że poprawisz odpowiedź?', 'Haha');
            }
        });
    } else {
        jAlert('<img src="images/urdoingitwrong.jpg" width="300" height="291" alt="U r doing it wrong!"/><br> Zaznacz odpowiedź!', 'U r doing it wrong!');
    }
});
/*odbieranie pytania*/
socket.on('question', function(questionID) {
    question_id = questionID;
    $.ajax({
        type : "get",
        dataType : "html",
        context : document.html,
        url : "/getQuestionById?questionId=" + questionID,
        timeout : 2500,
        cache : false,
        success : function(html) {
            //location.hash = 'foo';
            $('#quiz').html(html);
        },
        error : function() {
            //    $('#loginStatus').text('error');
            jAlert('<img src="images/failure.jpg" width="500" height="375" alt="Ajax login error"/>', 'Division by zero error!');
        }
    });
});
/*Update czasu*/
socket.on('timeUpdate', function(time) {
    time = time - 1;
    $("#zegarek").html("pozostało czasu: " + time);
});
/*Koniec pytania */
socket.on('endQuestion', function() {
    $("#zegarek").html("KONIEC!!!");
    $("#giveAnswer").hide();
    $("#problem").show();
});
/*Wyniki */
socket.on('result', function(userId, result) {
    var thisUserId = $("#userId").text();
    if(thisUserId === userId) {
        if(result) {
            egzamPassed();
        } else {
            egzamFailed();
        }
    }
});
egzamPassed = function() {
    jAlert('<img src="images/zdalem.gif" width="300" height="174" alt="pass"/>', 'Gratuluję zdałeś!');
};
egzamFailed = function() {
    jAlert('<img src="images/notPass.jpg" width="375" height="493" alt="not pass"/>', 'You shall not pass!');
};

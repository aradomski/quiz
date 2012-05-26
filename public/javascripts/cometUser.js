/*jslint browser: true, devel: true, sloppy: true  */
/*globals $: false, jConfirm: false, jAlert: false , io : false, window: false */

/*COMETY*/

var socket = io.connect(window.location);
var question_id;

$(document).ready(function() {
    var userName = $("#userName").text(), userId = $("#userId").text();
    socket.emit('loggedIn', userName, userId);
    alert(userName + "," + userId);
});

$(document).on("click", "#giveAnswer", function() {
    var answer = $("input[name='answer']:checked").val(), userId = $("#userId").text(), userName = $("#userName").text();
    if(answer !== undefined) {
        jConfirm('Wysłać odpowiedź?', 'I tak nie zdasz....', function(r) {
            if(r === true) {
                socket.emit('answerQuestion', userId, userName, question_id, answer);
                // alert(answer + "  qid" + question_id + " uid" + userId + "userNaem " + userName);
            } else {
                jAlert('I co myślisz że poprawisz odpowiedź?', 'Haha');
            }
        });
    } else {
        jAlert('<img src="images/urdoingitwrong.jpg" width="300" height="291" alt="U r doing it wrong!"/><br> Zaznacz odpowiedź!', 'U r doing it wrong!');
    }
});

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

socket.on('timeUpdate', function(time) {
    time = time - 1;
    $("#zegarek").html("pozostało czasu: " + time);
});

socket.on('endQuestion', function(time) {
    $("#zegarek").html("KONIEC!!!");
    $("#giveAnswer").hide();
    $("#problem").show();
});

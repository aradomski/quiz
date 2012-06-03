/*jslint browser: true, devel: true, sloppy: true  */
/*globals $: false, jConfirm: false, jAlert: false , io : false, window: false, createQForm : false, questionsAnwsers : true */
/*COMETY*/
var socket = io.connect(window.location), questionSet_id, egzamPassed, egzamFailed, SET;

$(document).ready(function() {
    var userName = $("#userName").text(), userId = $("#userId").text();
    socket.emit('loggedIn', userName, userId);
    // alert(userName + "," + userId);
});
/*Wysyłanie odpowiedzi*/
$(document).on("click", "#giveAnswer", function() {
    var userId = $("#userId").text(), userName = $("#userName").text(), currNum = parseInt($("#currNum").text());

    // alert(questionsAnwsers[currNum] + "  " + userName + "  " + currNum + "  " + userId);

    if(questionsAnwsers[currNum] !== undefined) {
        jConfirm('Wysłać odpowiedź?', 'I tak nie zdasz....', function(r) {
            if(r === true) {
                socket.emit('answerQuestion', userId, userName, questionsAnwsers[currNum]);
                $("#giveAnswer").hide();
            } else {
                jAlert('I co myślisz że poprawisz odpowiedź?', 'Haha');
            }
        });
    } else {
        jAlert('<img src="images/urdoingitwrong.jpg" width="300" height="291" alt="U r doing it wrong!"/><br> Zaznacz odpowiedź!', 'U r doing it wrong!');
    }
});
/*odbieranie pytania*/
socket.on('question', function(questionSetID) {
    questionSet_id = questionSetID;
    // alert(questionSetID);
    $.ajax({
        type : "get",
        dataType : "JSON",
        // context : document.html,
        url : "/getQuestionSetById?questionSetID=" + questionSetID,
        timeout : 2500,
        cache : false,
        success : function(html) {
            //location.hash = 'foo';
            // $('#quiz').html(html);
            //alert(html);
            SET = html;
            // alert(html.setHeaders.name);
            createQForm(html.set[0], 0, html.set.length);
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
socket.on('endQuestion', function(qID) {
    var i, qAnwsered = false;
    //   $("#zegarek").html("KONIEC!!!");
    $("#giveAnswer").hide();
    // $("#problem").show();
    for( i = 0; i < questionsAnwsers.length; i += 1) {
        if(questionsAnwsers[i].qID === qID) {
            qAnwsered = true;
        }
    }

    if(qAnwsered === false) {
        questionsAnwsers.push({
            qID : qID,
            answer : "X"
        });
    }
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

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
/*Wysyłanie odpowiedzi*/

$(document).on("click", "#giveAnswer", function() {
    var answer = $("input[name='answer']:checked").val();
    if(answer !== undefined) {
        jConfirm('Wysłać odpowiedź?', 'I tak nie zdasz....', function(r) {
            if(r === true) {
                //  jAlert('Confirmed: ' + r, 'Confirmation Results');
                $.ajax({
                    type : "post",
                    dataType : "html",
                    context : document.html,
                    url : "/answer/",
                    data : "answer=" + answer,
                    timeout : 2500,
                    cache : false,
                    success : function(html) {
                        //location.hash = 'foo';
                        $('#1').html(html);
                    },
                    error : function() {
                        //$('#loginStatus').text('error');
                        jAlert('<img src="images/failure.jpg" width="500" height="375" alt="Ajax login error"/>', 'Division by zero error!');
                    }
                });
            } else {
                jAlert('I co myślisz że poprawisz odpowiedź?', 'Haha');
            }
        });
    } else {
        jAlert('<img src="images/urdoingitwrong.jpg" width="300" height="291" alt="U r doing it wrong!"/><br> Zaznacz odpowiedź!', 'U r doing it wrong!');
    }
});
/*Czasomierz*/
var dodajZero = function(liczba) {'use strict';
    if(liczba < 10 && liczba > 0) {
        return "0" + liczba.toString();
    } else if(liczba < 0) {
        return;
    }
    return liczba;
};
$(document).ready(function() {
    var futureDate = new Date("May 18, 2012 01:00:00 GMT+2"), futureTime = futureDate.getTime();
    setInterval(function() {
        var now = new Date(), timeLeft = Math.floor((futureTime - now.getTime()) / 1000);
        $(".sec").text(dodajZero(timeLeft % 60));
        timeLeft = Math.floor(timeLeft / 60);
        $(".min").text(dodajZero(timeLeft % 60));
        timeLeft = Math.floor(timeLeft / 60);
        $(".hours").text(dodajZero(timeLeft % 24));
        timeLeft = Math.floor(timeLeft / 24);
        $(".days").text(dodajZero(timeLeft));
        $(".currentTime").text(now.toString());
        $(".endTime").text(futureDate.toString());
    }, 1000);
});
/*Logowanie*/
$(document).on("click", "#loginButton", function(e) {
    e.preventDefault();
    var pass = $("#loginStatus #loginPass").val();
    var userName = $("#loginStatus #loginUserName").val();
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
/*COMETY*/

var socket = io.connect(window.location);
socket.on('question', function(need) {
    alert(need);
    $("#1").html(need);
});

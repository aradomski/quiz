/*jslint browser: true, devel: true, sloppy: true */
/*globals $: false */
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
function dodajZero(liczba) {'use strict';
    if(liczba < 10 && liczba > 0) {
        return "0" + liczba.toString();
    } else if(liczba < 0) {
        return;
    }
    return liczba;
}


$(document).ready(function() {
    var futureDate = new Date("April 3, 2012 01:00:00 GMT+2"), futureTime = futureDate.getTime();
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

$(document).on("click", "#loginButton", function() {
    var pass = $("#loginStatus #pass").val();
    var userName = $("#loginStatus #userName").val();
    //alert(pass);
    //alert(userName);
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
            $('#loginStatus').text('error');
        }
    });

});
$(document).on("click", "#registerButton", function() {
    var pass = $("#registerForm #pass").val();
    var userName = $("#registerForm #userName").val();
    //alert(pass);
    //alert(userName);
    $.ajax({
        type : "post",
        dataType : "html",
        context : document.html,
        url : "/register/",
        data : "userName=" + userName + "&pass=" + pass,
        timeout : 2500,
        cache : false,
        success : function(html) {
            //location.hash = 'foo';
            $('#registerForm').html(html);
        },
        error : function() {
            $('#registerForm').text('error');
        }
    });

});
/*
 $(document).on("click", "#klik" , function() {
 $.ajax({
 type: "get",
 dataType: "html",
 context: document.html,
 url: "/ajaxContent",
 timeout: 2500,
 cache: false,
 success: function(html){
 //location.hash = 'foo';
 $('#newContent').html(html);
 },
 error: function(){
 $('#newContent').text('error');
 }
 });

 });
 */
/*
 $(document).on("mouseover", "#answerBlock li", function () {
 'use strict';
 $('#1').text($(this).attr('class'));
 });
 $(document).on("mouseout", "#answerBlock li", function () {
 'use strict';
 $('#1').text($(this).attr('class'));
 });
 */
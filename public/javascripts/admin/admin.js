/*jslint browser: true, devel: true, sloppy: true */
/*globals $: false, jConfirm: false, jAlert: false , dataTable: false, io : false */

//przejście do panelu admina
$(document).on("click", "#goToAdmin", function() {
    $.ajax({
        type : "post",
        dataType : "html",
        context : document.html,
        url : "/admin/",
        timeout : 2500,
        cache : false,
        success : function(html) {
            //location.hash = 'foo';
            $('#quiz').html(html);
        },
        error : function() {
            //$('#loginStatus').text('error');
            jAlert('<img src="images/failure.jpg" width="500" height="375" alt="Ajax login error"/>', 'Division by zero error!');
        }
    });
});
//przejście do listy użytkowników
$(document).on("click", "#toUserList", function() {
    $.ajax({
        type : "post",
        dataType : "html",
        context : document.html,
        url : "/users/",
        timeout : 2500,
        cache : false,
        success : function(html) {
            //location.hash = 'foo';
            $('#adminContent').html(html);
        },
        error : function() {
            //$('#loginStatus').text('error');
            jAlert('<img src="images/failure.jpg" width="500" height="375" alt="Ajax login error"/>', 'Division by zero error!');
        }
    });
});
//przejście do listy pytan
$(document).on("click", "#toQuestionList", function() {
    $.ajax({
        type : "post",
        dataType : "html",
        context : document.html,
        url : "/questions/",
        timeout : 2500,
        cache : false,
        success : function(html) {
            //location.hash = 'foo';
            $('#adminContent').html(html);
        },
        error : function() {
            //$('#loginStatus').text('error');
            jAlert('<img src="images/failure.jpg" width="500" height="375" alt="Ajax login error"/>', 'Division by zero error!');
        }
    });
});
//przejście do listy zestawów pytan
$(document).on("click", "#toQuestionSetList", function() {
    $.ajax({
        type : "post",
        dataType : "html",
        context : document.html,
        url : "/questionsSet/",
        timeout : 2500,
        cache : false,
        success : function(html) {
            //location.hash = 'foo';
            $('#adminContent').html(html);
        },
        error : function() {
            //$('#loginStatus').text('error');
            jAlert('<img src="images/failure.jpg" width="500" height="375" alt="Ajax login error"/>', 'Division by zero error!');
        }
    });
});
//Otwarcie/zamknięcie bocznej listy uzytkowników
$(document).on("click", "#switch", function() {
    $("#userStatusDiv").toggle();

    if($("#userStatusDiv").css("display") === "block") {
        $("#switch").css("right", "146px");
    } else {
        $("#switch").css("right", "0px");
    }

});
/*COMETY */
var socket = io.connect('http://localhost:1221');

$(document).on("dblclick", "tbody tr", function() {
    var id = $(this).attr("id");
    $("#timePopup").show();
    $(document).on("click", "#popupOk", function() {
        // alert($("#time").val() + "    " + id);
        socket.emit('startQuestion', id, $("#time").val());
        $("#timePopup").hide();
    });
});

socket.on('userAnwsered', function(userName, userId, answer, correct) {
    var column;
    // $("#1").append("userName = " + userName + "anwser = " + answer + "correct = " + correct);
    $("#userStatusTableBody tr").each(function() {
        if($(this).attr("id") === userId) {
            column = $(this).find(".anwser");
            column.html(answer);
            if(correct) {
                column.css("color", "#00FF00");
            } else {
                column.css("color", "#FF0000");
            }
        }
    });
});

socket.on('userLoggedIn', function(userName, userId) {
    var newUser = true, newRow = "<tr id ='" + userId + "' ><td >" + userName + "</td><td class='anwser'></td></tr>", html;
    $("#userStatusTableBody tr").each(function() {
        if($(this).attr("id") === userId) {
            newUser = false;
        }
    });
    if(newUser) {
        html = $("#userStatusTableBody").html();
        $("#userStatusTableBody").html(html + newRow);
    }
});

$(document).on("click", "#sendResults", function() {
    $("#userStatusTableBody tr").each(function() {
        var userId = $(this).attr("id");
        var result = $(this).children().last().css("color");
        if(result === "rgb(0, 255, 0)") {
            socket.emit('egzamResult', userId, true);
        } else {
            socket.emit('egzamResult', userId, false);
        }

        // alert(userId + "," + result);
        //socket.emit('startQuestion', id, $("#time").val());
    });
});

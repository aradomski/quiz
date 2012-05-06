/*jslint browser: true, devel: true, sloppy: true */
/*globals $: false, jConfirm: false, jAlert: false , dataTable: false */

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
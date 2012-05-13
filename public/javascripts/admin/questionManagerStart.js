/*jslint browser: true, devel: true, sloppy: true */
/*globals $: false, jConfirm: false, jAlert: false , dataTable: false */

$(function() {
    $("#questionTabs").tabs({
        ajaxOptions : {
            error : function(xhr, status, index, anchor) {
                $(anchor.hash).html("Couldn't load this tab. We'll try to fix this as soon as possible. " + "If this wouldn't be a demo.");
            }
        }
    });
});

//Dodawanie pytania
$(document).on("click", "#addQuestionButton", function(e) {
    var question = $("#questionForm input[name='question']").val(), a = $("#questionForm input[name='a']").val(), b = $("#questionForm input[name='b']").val(), c = $("#questionForm input[name='c']").val(), d = $("#questionForm input[name='d']").val(), correct = $("#questionForm input[name='correct']").val(), empty = 0;
    // alert(question);
    if(question === "" || a === "" || b === "" || c === "" || d === "" || correct === "") {
        empty += 1;
    } else {

        e.preventDefault();
        $.ajax({
            type : "get",
            dataType : "html",
            context : document.html,
            url : "/addQuestion?" + "question=" + question + "&a=" + a + "&b=" + b + "&c=" + c + "&d=" + d + "&correct=" + correct,
            timeout : 2500,
            cache : false,
            success : function(html) {
                //location.hash = 'foo';
                $('#questionForm').html(html);
            },
            error : function() {
                //   $('#registerForm').text('error');
                jAlert('<img src="images/failure.jpg" width="500" height="375" alt="Ajax register error"/>', 'Division by zero error!');
            }
        });
    }
});

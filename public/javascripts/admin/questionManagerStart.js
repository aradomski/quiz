/*jslint browser: true, devel: true, sloppy: true */
/*globals $: false, jConfirm: false, jAlert: false , dataTable: false */

$(function() {
    $("#questionTabs").tabs({
        ajaxOptions : {
            error : function(xhr, status, index, anchor) {
                $(anchor.hash).html("Couldn't load this tab. We'll try to fix this as soon as possible. ");
            }
        }
    });
});
//Dodawanie pytania
$(document).on("click", "#addQuestionButton", function(e) {
    var question = $("#questionForm textarea[name='question']").val(), a = $("#questionForm textarea[name='a']").val(), b = $("#questionForm textarea[name='b']").val(), c = $("#questionForm textarea[name='c']").val(), d = $("#questionForm textarea[name='d']").val(), correct = $("#questionForm select[name='correct']").val(), set = $("#questionForm select[name='set']").val(), name = $("select[name='set'] option:selected").text();
    // alert(set);
    if(question === "" || a === "" || b === "" || c === "" || d === "" || correct === "" || set === "") {
        jAlert('<img src="images/emptyfield.jpg" width="500" height="310" alt="Empty field"/><br> Brak hasła.', 'U r doing it wrong!');
    } else {
        e.preventDefault();
        $.ajax({
            type : "get",
            dataType : "html",
            context : document.html,
            url : "/addQuestion?" + "question=" + question + "&a=" + a + "&b=" + b + "&c=" + c + "&d=" + d + "&correct=" + correct + "&set=" + set + "&name=" + name,
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

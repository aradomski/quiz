/*jslint browser: true, devel: true, sloppy: true */
/*globals $: false, jConfirm: false, jAlert: false , dataTable: false */

$(function() {
    $("#questionSetTabs").tabs({
        ajaxOptions : {
            error : function(xhr, status, index, anchor) {
                $(anchor.hash).html("Couldn't load this tab. We'll try to fix this as soon as possible. " );
            }
        }
    });
});


//Dodawanie zestawu pytań
$(document).on("click", "#addQuestionSetButton", function(e) {
    var name = $("#questionSetForm input[name='name']").val(), className = $("#questionSetForm input[name='className']").val();
    // alert(question);
    if(name === "" || className === "") {
        jAlert('<img src="images/emptyfield.jpg" width="500" height="310" alt="Empty field"/><br> Brak hasła.', 'U r doing it wrong!');
    } else {
        e.preventDefault();
        $.ajax({
            type : "get",
            dataType : "html",
            context : document.html,
            url : "/addQuestionSet?" + "name=" + name + "&className=" + className,
            timeout : 2500,
            cache : false,
            success : function(html) {
                //location.hash = 'foo';
                $('#questionSetForm').html(html);
            },
            error : function() {
                //   $('#registerForm').text('error');
                jAlert('<img src="images/failure.jpg" width="500" height="375" alt="Ajax register error"/>', 'Division by zero error!');
            }
        });
    }
});


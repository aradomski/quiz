/*jslint browser: true, devel: true, sloppy: true */
/*globals $: false, jConfirm: false, jAlert: false , dataTable: false */

$(function() {
    $("#userTabs").tabs({
        ajaxOptions : {
            error : function(xhr, status, index, anchor) {
                $(anchor.hash).html("Couldn't load this tab. We'll try to fix this as soon as possible. ");
            }
        }
    });
});
/*Rejestracja*/
$(document).on("click", "#registerButton", function(e) {
    e.preventDefault();
    var pass = $("#registerForm #pass").val(), pass2 = $("#registerForm #pass2").val(), userName = $("#registerForm #registerUserName").val(), group = $("#registerForm #group").val();

    // alert(group);
    // alert(pass);
    // alert(userName);

    if(pass !== "" && pass2 !== "" && pass === pass2 && userName !== "") {
        $.ajax({
            type : "get",
            dataType : "html",
            context : document.html,
            url : "/register?" + "userName=" + userName + "&pass=" + pass + "&group=" + group,
            timeout : 2500,
            cache : false,
            success : function(html) {
                //location.hash = 'foo';
                $('#registerForm').html(html);
            },
            error : function() {
                //   $('#registerForm').text('error');
                jAlert('<img src="images/failure.jpg" width="500" height="375" alt="Ajax register error"/>', 'Division by zero error!');
            }
        });
    } else {
        if(pass === "" || pass2 === "") {
            jAlert('<img src="images/emptyfield.jpg" width="500" height="310" alt="Empty field"/><br> Brak hasła.', 'U r doing it wrong!');
        }
        if(pass !== pass2) {
            jAlert('<img src="images/urdoingitwrong.jpg" width="300" height="291" alt="U r doing it wrong!"/><br> Błąd hasła.', 'U r doing it wrong!');
        }
        if(userName === "") {
            jAlert('<img src="images/emptyfield.jpg" width="500" height="310" alt="Empty field"/><br> Brak nazwy użytkownika.', 'U r doing it wrong!');
        }
    }
});

/*jslint browser: true, devel: true, sloppy: true */
/*globals $: false, jConfirm: false, jAlert: false , dataTable: false */

$(function() {
    $("#userTabs").tabs();
});

$(document).ready(function() {
    $('#userList').dataTable({
        "aaSorting" : [[0, "asc"]]
        // ,"bStateSave" : true
    });
});
/*Rejestracja*/
$(document).on("click", "#registerButton", function(e) {
    e.preventDefault();
    var pass = $("#registerForm #pass").val(), pass2 = $("#registerForm #pass2").val(), userName = $("#registerForm #registerUserName").val();
    //alert(pass);
    //alert(userName);
    if(pass !== "" && pass2 !== "" && pass === pass2 && userName !== "") {
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
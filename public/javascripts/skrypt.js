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
/*AFTER END SCRIPTS*/

$(document).on("click", "#problem", function(e) {
    jAlert('<h1>Test już się skończył</h1><br /><img src="images/mad.jpg" width="500" height="310" alt="U mad?"/>', 'U mad?');
});

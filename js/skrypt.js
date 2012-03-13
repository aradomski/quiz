$(function() {
	var url = "https://inf.ug.edu.pl/sq/src/login.php";
	 $.ajax({
	        url: url,
	        timeout: 2500,
			data: parameters,
	        contentType: 'application/json; charset=utf-8', 
	        success: function(html) {
				$("#login").html(html);
	        },
	        beforeSend: function() {
				$("#login").text("as");
	        },
	        error: function() {
				alert('dupa');
	        }
	    }); 
	alert("ada");
});


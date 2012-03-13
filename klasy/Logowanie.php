<?php
Class Logowanie{

	function login($id_user){
		session_start();
		$_SESSION['id_user'] = $id_user;
	}
	
	function logincheck(){
		session_start();
		if(isSet($_SESSION['id_user'])){
			return $_SESSION['id_user'];
		}else{
			return false;
		}
	}
	
	function logout(){
		session_start();
		if(isSet($_SESSION['id_user'])){
			$_SESSION['id_user'] = null;
			session_destroy();
		}
		if(isSet($_COOKIE['id_user'])){
			setcookie('id_user', "", time()-3600);
		}	
	}
}
?>

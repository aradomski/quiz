<?php
class Baza{

	function connect(){
		try {
			$db = new PDO ("mysql:dbname=quiz;host=localhost","root","tajnehaslo");
			$db -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			//echo "PDO connection object created <br />";
			return $db;
		}
		catch(PDOException $e){
			echo $e->getMessage();
			echo "blad bazy danych";
			return false;
		}
	}
}
?>

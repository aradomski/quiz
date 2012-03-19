<!DOCTYPE html>
<html>
	<head>
		<meta charset=utf-8>
		<link rel="Shortcut icon" href="style/images/fav.png" />
		<link rel="icon" type="image/png" href="style/images/fav.png"/>
		
		
		<link rel="stylesheet" type="text/css" href="style/styl.css" />
		
		<script type="text/javascript" src="js/jquery.min.js"></script>	
		<script type="text/javascript" src="js/skrypt.js"></script>	
	
		<title>You shall not pass!</title>
	</head>
	<body>
		<header>Naglowek:)</header>
		<section id="content">
			<article id="leftMenu">
			<?php
				echo $path = $_SERVER['DOCUMENT_ROOT']; 
			?>
			</article>
			<form id="quiz">
				<section id="question">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra, nunc ac lacinia varius, nisl elit vehicula nisl, a aliquet quam ante eleifend magna. Etiam pretium, enim non cursus auctor, lacus felis ornare nulla, sit amet mattis neque neque a urna. Ut et quam lacinia diam vestibulum laoreet. Nunc vel lacus sit amet mi molestie ultrices. Fusce sollicitudin tempus dui sit amet sodales. Mauris condimentum commodo ipsum, lacinia consectetur turpis rhoncus suscipit. Sed mattis lacinia magna, et pulvinar urna bibendum eget.
					<ul id="answerBlock">
						<li id="answerA" class="answer"><input type="radio" name="anwser" value="A" /><h1 class="answerH1">A</h1><span class="answerSpan">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse blandit.</span></li>
						<li id="answerB" class="answer"><input type="radio" name="anwser" value="B" /><h1 class="answerH1">B</h1><span class="answerSpan">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a libero eget enim venenatis iaculis in vel lacus. Quisque sapien lacus, dapibus in ultrices eu, facilisis ac ipsum. Maecenas ut ante magna, eget auctor elit. Morbi tempor venenatis nunc, eget cursus eros gravida nec. Aenean vel mauris quam. Integer ultrices, augue et porta imperdiet, ante lectus interdum ipsum, in sagittis mauris ligula vitae tortor. Duis quis arcu in nisi consequat feugiat in non quam. 

 Ut mollis pellentesque velit, eget semper neque tempor at. Suspendisse euismod vestibulum ullamcorper. Suspendisse vehicula volutpat sapien, eget hendrerit mauris cursus sed. Nunc a ante lectus, vel lacinia lacus. Maecenas pretium, arcu sed sollicitudin bibendum, enim augue tincidunt orci, nec vehicula nisl nisi vel libero. Curabitur ligula odio, semper nec viverra quis, lacinia et lectus. Morbi eu dui risus. Aliquam leo nunc, convallis et suscipit sed, sagittis ut libero. Maecenas eget tortor eu libero dignissim rhoncus. Nunc ultricies sem non sem varius et imperdiet lectus fringilla. Aenean sollicitudin viverra libero, quis blandit massa dapibus vel. Nam accumsan mi ac dolor ultricies id laoreet elit tincidunt. Fusce ac enim sed nulla molestie egestas ut ut nunc. In venenatis justo nec odio porta et semper ipsum vulputate.</span></li>
						<li id="answerC" class="answer"><input type="radio" name="anwser" value="C" /><h1 class="answerH1">C</h1><span class="answerSpan">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse blandit.</span></li>
						<li id="answerD" class="answer"><input type="radio" name="anwser" value="D" /><h1 class="answerH1">D</h1><span class="answerSpan">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse blandit.</span></li>
					</ul>
				</section>
			</form>
		</section>
		<footer>
			Stopka <br> 
			<section id="debug">
				<p id="1"></p>
				<p id="2"></p>
				<p id="3"></p>
				<p id="4"></p>
				<p id="5"></p>
			</section>
		</footer>
	</body>
</html>



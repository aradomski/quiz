#! /bin/bash
if [ -z '$1' ] ; then
	echo "Podaj opis commitu";
else
	#Jakbym chciał cudzysłowia
	#nazwa=\'$1\';
	#echo $nazwa;

	echo $1;
	echo "*************Adding to git*************";
	git add . && git commit -m "$1" && git push 
	echo "*************Adding to mercurial*************";
	hg add . && hg commit -m "$1" && hg push
fi


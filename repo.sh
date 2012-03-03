#! /bin/bash
if [ -z '$1' ] ; then
	echo "Podaj opis commitu";
else
	nazwa=\'$1\';
	echo $1;
	echo $nazwa;
	echo "*************Adding to git*************";
	git add . && git commit -m "$nazwa" && git push 
	echo "*************Adding to mercurial*************";
	hg add . && hg commit -m "$nazwa" && hg push
fi


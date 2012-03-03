#! /bin/bash

git add .
hg add .
git commit -m '$1'
hg commit -m '$1'
git push 
hg push

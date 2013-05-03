## Made by Tyler Lubeck
## 04/08/2013
## For the Spring 2013 final project, we're using both the repo provided by
## Ming and another repo that is required by Heroku. Heroku has specific 
## requirements for their repo (basically, use "git init" and then
## "heroku create" in an empty folder).
##
## We want the files for our heroku app to be seen on github, but also be
## easily pushed to heroku. This script accomplishes that. Basically, all 
## work is done in the repo provided by Ming and, when needed, this script
## is run to take the files for heroku and ship them off to heroku.
## 
## The HEROKU_APP variable will need to hold the relative or direct path to
## the folder you created for heroku.
##
## Required Directory Structure for the repo provided by Ming:
## comp20_groupX
## |
## | - heroku
## |   | - commitToHeroku.sh
## |   | - * (heroku files)
## |
## | - * (other files for project)
##
##
##
## Usage: sh commitToHeroku.sh "Commit message here"

HEROKU_APP="../../afternoon-anchorage-3983"
GROUP_PROJECT=`pwd`

cp -r * $HEROKU_APP

if [ "$1" =  "-commit" ];then
	COMMITMESSAGE=$2
	echo $COMMITMESSAGE
    git pull
    git add .
    git commit -m "$COMMITMESSAGE"
    git push


	cd $HEROKU_APP

    git pull
	git add *
	git commit -m "$COMMITMESSAGE"
	git push origin master

cd $GROUP_PROJECT

fi

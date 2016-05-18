#!/bin/sh

YELLOW='\033[1;33m'
BLUE='\033[1;34m'
RED='\033[1;31m'
NC='\033[0m'

./node_modules/eslint/bin/eslint.js ./source/**/*.js
RESULT=$?
if [ $RESULT -ne 0 ]
then
    printf "${RED}[!] ${BLUE}Commit aborted, please fix the problems in order to continue${NC} \n"
    printf "(You can use --no-verify to bypass it) \n"
    exit 1
else
    exit 0
fi

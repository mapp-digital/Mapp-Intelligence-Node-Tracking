#!/bin/bash

printf "#########################################\n"
echo NodeJS: "$(node -v)"
printf "#########################################\n"

echo "$(node -v)" > ./node-version.txt

npm install --legacy-peer-deps
npm run "${EXECUTE_TYPE}"

exit $?

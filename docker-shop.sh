#!/bin/bash

printf "#########################################\n"
echo NodeJS: "$(node -v)"
printf "#########################################\n"

cd example || exit 1

npm install
# npm ci --only=production

npm run start

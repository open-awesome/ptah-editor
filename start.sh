#!/bin/sh
cd ./backend/migrations
node ./../../node_modules/migrate-mongo/bin/migrate-mongo.js up
cd ..
cd ..
node ./index.js


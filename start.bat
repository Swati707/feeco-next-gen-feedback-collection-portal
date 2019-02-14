@echo off

set mongoexe="C:\Mongo DB\bin\mongod.exe"
set mongoDB="F:\Projects\MongodbData\"

REM start "C:\Mongo DB\bin\mongod.exe" --dbpath="f:\Projects\MongodbData"
timeout 5
start nodemon ".\index.js"

timeout 2
cd "frontend"
ng serve


@echo off

set mongoexe=c:\MongoDB\bin\mongod.exe
set mongoDB="d:\mongodb database"

start %mongoexe% --dbpath %mongoDB%
timeout 5
start nodemon ".\index.js"

timeout 2
cd "frontend"
ng serve
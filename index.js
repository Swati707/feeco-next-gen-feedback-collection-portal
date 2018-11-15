exports.printMsg = function() {
    console.log("This is a message from the demo package");
  }

//importing modules
var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//mongoose.Promise = global.Promise;
var bodyparser = require('body-parser');
var path = require('path');

var app = express();


//connect to mongoDB
mongoose.connect('mongodb://lokesh:lokesh@ds121599.mlab.com:21599/farmer-retailer', 
            {useMongoClient: true, server: { poolSize: 5 }});

//on connection
mongoose.connection.on('connected', ()=>{
  console.log("connected to database mongodb");
});
mongoose.connection.on('error', (err)=>{
  if(err){
      console.log("error in connection to database mongodb.\n"+err);
  }
});

//adding middleware
app.use(cors());
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'frontend/public')));

//routes
// const route = require('./backend/routes/route');
const api_route = require('./backend/routes/api');

app.use('/api', api_route);

app.get('/',(req,res,next)=>{
  console.log(res);
  res.sendFile(path.join(__dirname,'frontend/public/index.html'));
  // res.status(200).json({
  //     messsage:"You requested Home page"
  // })
});

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'frontend/src/index.html'));
})

//initiating the server
const port = process.env.PORT || app.get('port') || 3000;

app.listen(port, ()=>{
    console.log("server started at port: " + port);
});
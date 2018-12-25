exports.printMsg = function () {
  console.log("This is a message from the demo package");
}

//importing modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//mongoose.Promise = global.Promise;
const bodyparser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const app = express();
const router = express.Router();
const joi = require('joi');
const debug = require('debug')('app:Startup');

// importing route file 
const route = require('./routes/routes');
  /*
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
  */

  //adding middleware
  app.use(cors());
  app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'frontend/public')));

// //Function for validating Objects
// function validateTeacher(Teacher) {
//   const Schema = {
//     name = Joi
//   }
// }

//Enabling CORS (Cross Origin Access)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');

  if (req.method === 'Options') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
    return res.status(200).json({});
  }
});

//routes
const route = require('./api/routes/routes');
app.use('/routes/routes.js', route);
app.use('./routes/feedbacks.js', feedbacks);



//initiating the server
const port = process.env.PORT || app.get('port') || 3000;

app.listen(port, () => {
  console.log("server started at port: " + port);
});

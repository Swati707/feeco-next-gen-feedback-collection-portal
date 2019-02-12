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
const app = express();

// importing route file 
  //connect to mongoDB
  mongoose.connect('mongodb://localhost:27017/projectSaranshDB',
              {server: { poolSize: 5 }});
  
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
// app.use(express.static(path.join(__dirname, 'frontend/public')));

//routes
const formsRoute = require('./backend/routes/forms')
const responsesRoute = require('./backend/routes/responses')
const formCreatorRoute = require('./backend/routes/form_creators')
const respondentRoute = require('./backend/routes/respondents')
const formReceiverRoute = require('./backend/routes/form_receiver')

app.use('/response', responsesRoute)
app.use('/creator', formCreatorRoute)
app.use('/respondent', respondentRoute)
app.use('/form', formsRoute)
app.use('/formreceiver', formReceiverRoute)

app.use('/a', (req, res) => {
  console.log("woij")
  res.json({g:"gfh"})
})

app.get('/',(req,res,next)=>{
  console.log(res);
  // res.sendFile(path.join(__dirname,'frontend/public/index.html'));
  res.status(200).json({
      messsage:"You requested Home page"
  })
});

app.get('*',(req,res)=>{
  res.send("Other pages")
  // res.sendFile(path.join(__dirname,'frontend/src/index.html'));
})



//initiating the server
const port = process.env.PORT || app.get('port') || 3000;

app.listen(port, () => {
  console.log("server started at port: " + port);
});

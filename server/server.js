const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//require controller
const userController = require('./controllers/userController');
const tripController = require('./controllers/tripController');


//create app instance and other const variables
const app = express();
const PORT = process.env.PORT;

//connect to the DB


//use cors
app.use(cors());

//handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//handling cookies
app.use(cookieParser());

// handle requests for static files
app.use('/assets', express.static('./client/assets'));


//get request to the app page, serve the index.html
app.get('/', (req, res) => {
    //condition on ENV, if production, serve build/index.html
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

//testing for get all user
app.get('/user', userController.getAllUsers, (req, res) => {
  res.status(200).send(res.locals.data);
})

//testing for createUser
app.post('/user', userController.createUser, (req, res) => {
  res.status(200).send(res.locals.data);
})

//testing for verifyUser
app.post('/login', userController.verifyUser, (req, res) => {
  res.status(200).send(res.locals.data);
})

//testing for createTrip
app.post('/addtrip', tripController.createTrip, (req, res) => {
  res.status(200).send(res.locals.trip);
})

//testing for addtripbuddy
app.post('/addbuddy', tripController.addTripbuddy, (req, res) => {
  res.status(200).send(res.locals.members);
})

//fetch for getall trips for user
app.post('/gettrips', tripController.getAlltrips, (req, res) => {
  res.status(200).send(res.locals.trips);
})

//create global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Caught unknown middleware error',
      staus: 500,
      message: {err: 'An error occured'}
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  })
  
  
app.listen(PORT, ()=> {console.log('listening to Port 3000')});

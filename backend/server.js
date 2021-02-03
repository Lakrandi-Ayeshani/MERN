const express = require('express');
//const bodyParser = require('body-parser'); new version of express include this
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config(); //enviorenment variable

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());  //this is the cors middleware
//app.use(bodyParser.json()); code change to above code
app.use(express.json());   //sending and receiving data

/*const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true} //uri thats where our database storage 
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongiDB database connection established successfully");

});*/

mongoose.connect('mongodb://localhost/admin', { useNewUrlParser: true, useUnifiedTopology: true  } );

mongoose.connection.once('open', () => {
    console.log('connections has been made');
}).on('error', () => {
    console.log('error is: ',error);
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter); 

app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});

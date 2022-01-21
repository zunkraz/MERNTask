const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
//making server
const app = express();

//connect to DB
connectDB();

//activate cors
app.use(cors());

//enable express.json
app.use(express.json({extended: true}))

//PORT APP
const port = process.env.port || 4000;

//import routes
app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/projects',require('./routes/projects'));
app.use('/api/tasks',require('./routes/task'));


//Run APP
app.listen(port,'0.0.0.0', () => {
    console.log(`The server is listeing in the port ${PORT}`)
});
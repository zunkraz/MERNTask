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
const PORT = process.env.PORT || 4000;

//import routes
app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/projects',require('./routes/projects'));
app.use('/api/tasks',require('./routes/task'));


//Run APP
app.listen(PORT, () => {
    console.log(`The server is listeing in the port ${PORT}`)
});
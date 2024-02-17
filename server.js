const express = require('express');
const app = express();
const config = require('./config')
const User = require('./models/user')
const authenticate = require('./authenticate')
const bodyParser = require('body-parser')
const UserRoutes = require('./routes.js/userRoutes');
const PostRoutes = require('./routes.js/postRoutes')

// Database connection
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.DBURL)
    .then(() => console.log('connected to the Database'))
    .catch(err => console.log(err))

app.use(bodyParser.json())

app.use('/user',UserRoutes);
app.use('/post',authenticate,PostRoutes);

app.get('/users',authenticate,(req,res) => {
    User.find().then(rec => {
        res.status(200).json(rec)
    })
})

// Simple Route
app.get('/',(req,res) => res.send('Hello World!'))

app.listen(3000,() => console.log("Server is running port 3000"))
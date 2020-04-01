const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const authentication = require('./routes/api/authentication')
const app = express()

// Bodyparser
app.use(bodyParser.json())

// DB config
const db = require('./config/keys').mongoURI

// Connect to DB (MongoDB)
mongoose.connect(db)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

// Routes
app.use('/authentication', authentication)    

// Start the server
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server started on port ${port}...`))
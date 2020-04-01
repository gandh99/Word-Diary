const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

// Bodyparser
app.use(bodyParser.json())

// DB config
const db = require('./config/keys').mongoURI

// Connect to DB (MongoDB)
// mongoose.connect(db)
//     .then(() => console.log('MongoDB connected...'))
//     .catch(err => console.log(err))

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server started on port ${port}...`))
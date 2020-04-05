const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const passport = require("passport")
const connectDB = require('./config/db')

// Init
const app = express()
dotenv.config({ path: './config/config.env' })

// Connect to DB
connectDB()

// Passport
require("./config/passport")(passport)
app.use(passport.initialize())
app.use(passport.session())

// Bodyparser
app.use(bodyParser.json())

// Routes
app.use('/authentication', require('./routes/api/authentication'))
app.use('/translate', require('./routes/api/translate'))    

// Start the server
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server started on port ${port}...`))
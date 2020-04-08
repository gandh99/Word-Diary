const express = require('express')
const app = express()
const passport = require("passport")
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// Init
app.use(express.json())
dotenv.config({ path: './config/config.env' })

// Connect to DB
connectDB()

// Passport
require("./config/passport")(passport)
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/authentication', require('./routes/api/authentication'))  

// Start the server
const port = process.env.AUTH_SERVER_PORT || 4000
app.listen(port, () => console.log(`Authentication server started on port ${port}...`))
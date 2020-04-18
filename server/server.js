const express = require('express')
const dotenv = require('dotenv')
const passport = require("passport")
const setupProxy = require('./config/setupProxy')
const connectDB = require('./config/db')
const io = require('./config/setupIO')

// Init
const app = express()
dotenv.config({ path: './config/config.env' })

// Connect to DB
connectDB()

// Passport
require("./config/passport")(passport)
app.use(passport.initialize())
app.use(passport.session())

// Proxy to the authServer. This line of code MUST be above the bodyparser!!!
// It is a known issue: https://github.com/chimurai/http-proxy-middleware/issues/40
setupProxy(app)

// Bodyparser
app.use(express.json())

// Routes
app.use('/diary', require('./routes/api/diary'))
app.use('/friends', require('./routes/api/friends'))
app.use('/notifications', require('./routes/api/notifications'))

// Setup IO connection
io.init()

// Start the server
const port = process.env.SERVER_PORT || 5000
app.listen(port, () => console.log(`Server started on port ${port}...`))
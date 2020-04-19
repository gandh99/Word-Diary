const express = require('express')
const dotenv = require('dotenv')
const passport = require("passport")
const setupProxy = require('./config/setupProxy')
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

// Proxy to the authServer. This line of code MUST be above the bodyparser!!!
// It is a known issue: https://github.com/chimurai/http-proxy-middleware/issues/40
setupProxy(app)

// Bodyparser
app.use(express.json())

// Routes
app.use('/diary', require('./routes/api/diary'))
app.use('/friends', require('./routes/api/friends'))
app.use('/notifications', require('./routes/api/notifications'))

// Start the server and IO connection
const port = process.env.SERVER_PORT || 5000
const server = app.listen(port, () => console.log(`Server started on port ${port}...`))
const io = require('socket.io')(server)
require('./config/setupIO').init(io)
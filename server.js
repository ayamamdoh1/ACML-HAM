const express = require('express')
const cors = require('cors')
require('dotenv').config()
const logger = require('./api/middleware/logger').verifyToken

// Require Router Handlers
const app = express()
const user = require("./api/routes/user.route")
const notification = require("./api/routes/notification.route")
const login=require("./api/routes/login")

//DB connection 
const url = require('./config/DBconfig')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)
mongoose.connect(url, {useUnifiedTopology: true,useNewUrlParser: true})
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
})

// Init middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use('/api/v1/users',user)
app.use('/api/v1/notifications',logger,notification)
app.use('/login',login)


const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server up on ${port} 👍`))
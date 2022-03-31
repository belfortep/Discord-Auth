//Requires
const express = require('express')
const app = express()
const indexRoute = require('./routes/indexRoute')
const authRoute = require('./routes/authRoute')
const dashboardRoute = require('./routes/dashboardRoute')
const path = require('path')
const session = require('express-session')
const dotenv = require('dotenv').config()
const passport = require('passport')
const discordStrategy = require('./strategies/discordStrategy')
const { MONGODB_URI, SECRET } = require('./config')
const MongoStore = require('connect-mongo')
//Config

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'))



//Middlewares

app.use(express.json())

app.use(session({
    secret: SECRET,
    name: "discord-app",
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
        mongoUrl: MONGODB_URI   //guardo sesion de usuario
    }),
    cookie: {
        maxAge: 60000 * 60 * 24, //duracion sesion
    }
}))

app.use(passport.initialize())

app.use(passport.session())

//Global Variables

app.use((req, res, next) => {

    app.locals.user = req.user //guardando variable...
    next()

})

//Routes

app.use('/', indexRoute)

app.use('/auth', authRoute)

app.use('/dashboard', dashboardRoute)



module.exports = app
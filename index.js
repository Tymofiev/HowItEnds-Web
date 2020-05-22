const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)

const { passport } = require('./server/lib/auth')
const db = require('./server/lib/db')

var app = express()

app.use(cors())
app.use('/server/uploads', express.static('server/uploads'))
app.use(bodyParser.json())
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/', require('./server/routes/index'))
app.use('/auth', require('./server/routes/auth'))
app.use('/email', require('./server/routes/email'))
app.use('/user', require('./server/routes/user'))

app.listen(5000, () => {
  console.info(`Server started: http://localhost:5000`)
})

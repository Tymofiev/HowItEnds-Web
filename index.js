var express = require('express')
var app = express()
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')

const { passport } = require('./server/lib/auth')

const db = require('./server/lib/db')

app.use(cors())
app.use('/server/uploads', express.static('server/uploads'))
app.use(bodyParser.json())
app.use(
  session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/', require('./server/routes/index'))
app.use('/email', require('./server/routes/mail'))
app.use('/user', require('./server/routes/user'))

app.listen(5000, () => {
  console.info(`Server started: http://localhost:5000`)
})

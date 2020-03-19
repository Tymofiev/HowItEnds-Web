var express = require('express')
var app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./server/lib/db')

app.use(cors())
app.use(bodyParser.json())

const indexRoute = require('./server/routes/index')
const mailRoute = require('./server/routes/mail')

app.use('/', indexRoute)
app.use('/email', mailRoute)

app.listen(5000, () => {
  console.info(`Server started: http://localhost:5000`)
})

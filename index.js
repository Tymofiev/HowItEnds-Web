var express = require('express')
var app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./server/lib/db')

app.use(cors())
app.use(bodyParser.json())

const indexRoute = require('./server/routes/index')
app.use('/', indexRoute)

app.listen(5000, () => {
  console.info(`Server started: http://localhost:5000`)
})

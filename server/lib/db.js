const config = require('config')
const mongoose = require('mongoose')

const connection = config.get('db')
mongoose.set('useFindAndModify', false)
const db = mongoose.connect(connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.once('open', () => {
  console.log('Database connected')
})

module.exports = db

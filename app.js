const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose');
const app = express()
const cors = require('cors')
const port=process.env.PORT || 3000
const mongoUri = process.env.MONGO_URL 
app.use(cors())
app.use(express.json())
app.get('/', function (req, res) {
  res.send('Hello To Auth Node App')
})

app.use('/api/v1/auth', require('./router/auth.router'))

app.listen(port, function () {
  console.log(`Example app listening on port ${port}! http://localhost:${port}/`)
})
mongoose.connect(mongoUri)
  .then(() => console.log('Connected!'));
const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/users-routes')
const port = 8000
const app = express()

app.use(bodyParser.json())
app.use('/users',userRoutes)

console.log(`Listening on port ${port}`)
app.listen(port)

require('./models/User')
require('./models/Track')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const trackroutes = require('./routes/trackRoutes')
const requireAuth = require('./middlewares/requireAuth')

const app = express()
app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackroutes)
const mongoUri = 'mongodb+srv://admin:Password@cluster0-uftra.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex:true

})
mongoose.connection.on('connected',() => {
    console.log('Connected to mongo instance')
})
mongoose.connection.off('error',(err) => {
    console.log('Error connecting to mongo: ',err)

})
app.get('/',requireAuth,(req,res) => {
    res.send(`Your email: ${req.user.email}`)
})

app.listen(3000,() => {
    console.log('Listening on port 3000')
})
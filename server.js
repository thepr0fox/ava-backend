if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const { engine } = require('express-handlebars')

const indexRouter = require('./routes/index')

app.engine('hbs', engine());
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', err => console.error(err))
db.once('open', () => console.log('Connected to database'))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000, () => console.log('Server started'))
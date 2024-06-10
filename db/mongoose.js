const mongoose = require("mongoose")
const url = 'mongodb://localhost:27017/'
const name = 'galleryDB'

mongoose.connect(url+name)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function(){
    console.log('Connected to MongoDB')
})

module.exports = db
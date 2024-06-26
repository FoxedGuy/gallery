const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
})

const Picture = mongoose.model('Picture', pictureSchema);
module.exports = Picture;

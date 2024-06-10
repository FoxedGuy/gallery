const mongoose = require('mongoose');

const Picture = mongoose.model("Picture", {
    name: String,
    description: String,
    url: String
});

module.exports = Picture;

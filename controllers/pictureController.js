var Picture = require('../models/picture');
const mongoose = require('mongoose');
const db = require('../db/mongoose');

exports.pictures_list = function(req, res) {
    let pictureList

    const getPictures = async () => {
        try{
            pictureList = await Picture.find()
            res.render('pictures/picture_list', {title:"Gallery",items: pictureList})
        }catch(err){
            console.log(err)
        }
    }
    getPictures();
}

exports.picture_create_get = function(req, res) {
    res.render('pictures/add_picture');
}

exports.picture_create_post = function(req, res, next) {
    let newPicture = new Picture({
        name: req.body.name,
        description: req.body.description,
        url: req.body.url
    });

    newPicture.save().then(() => {
        res.render('pictures/picture_added');
    }).catch((err) => {
        console.log(err);
    });
}

exports.picture_delete = function(req, res) {
    id = req.body.id;
    Picture.findByIdAndDelete(id).then(picture => {
        res.render('pictures/picture_deleted', {name: picture.name});
    });    
}

exports.picture_update_get = function(req, res) {
    const id = req.params.id;
    let data;
    Picture.findOne({_id: id}).then(function(picture) {
        res.render('pictures/update_picture', {title: 'Update Picture', item: picture, id: id});
    });
}

exports.picture_update_post = function(req, res) {
    let picture = {}
    picture.name = req.body.name;
    picture.description = req.body.description;

    const id = req.params.id;

    Picture.findOneAndUpdate({_id: id}, picture, {new: true}).then(picture => {            
        res.render('pictures/picture_updated',{name: picture.name, description: picture.description});
    })
}

exports.picture_by_id = function(req, res){
    const getPicture = async () => {
        try {
            picture = await Picture.findById(req.params.id);
            res.render('pictures/picture_detail', {title: 'Picture Detail', item: picture});
        } catch (err) {
            console.log(err);
        }
    };

    getPicture();
}

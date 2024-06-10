var User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const localStorage = require("node-localstorage").LocalStorage;
const db = require("../db/mongoose");
const e = require("express");

exports.users_list = function(req,res){
    let userList

    const getUsers = async () => {
        try{
            userList = await User.find()
            res.send(userList)
        }catch(err){
            console.log(err)
        }
    }

    getUsers();
};
exports.user_create_get = function(req,res){
    res.render('users/register_user')
}
exports.user_create_post = function(req,res,next){
    bcrypt.hash(req.body.password, 10, function(err, hash){
        if(err){
            return res.status(500).json({
                error: err
        })
        }
        let newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: hash,
        })

        newUser.save().then(() => {
            res.render("users/user_registered")
        }).catch((err) => {
            console.log(err)
        })
    })
}

exports.user_login_get = function(req,res){
    res.render('users/login_user')
}

exports.user_login_post = function(req,res){
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email: email})
        .then(user => {
            if(user){
                bcrypt.compare(password, user.password, function(err, result){
                    if(err){
                        return res.status(401).json({
                            failed: "Unauthorized Access"
                        })
                    }

                    if(result){
                        let token = jwt.sign({username: user.username}, "secret", {expiresIn: "2h"})
                        res.json({
                            message: "Login Successful",
                            token: token
                        })
                    }else {
                        res.json({
                            message: "Password does not match"
                        })
                    }
                })
            } else {
                res.json({
                    message: "User not found"
                })
            }
        })
}


exports.user_delete = function(req,res){
    const deleteUser = async () => {
        try{
            const result = await User.deleteOne({username: req.params.username});
            if (result.deletedCount === 0){
                return res.status(404).send({ message: "User not found"})       
            }

            res.status(200).send({ message: "User deleted"})
        }
        catch(err){
            console.log(err)
        }
    }

    deleteUser();
}

exports.user_update = function(req,res){
    const updateUser = async () => {
        try{
            await User.update({username: req.body.username}, {username: req.body.newUsername})
            res.send("User updated")
        }
        catch(err){
            console.log(err)
        }
    }

    updateUser();
}

exports.get_user_by_username = function(req,res){
    let user

    const getUser = async () => {
        try{
            user =
                await User.find({username: req.params.username})

            if (user.length === 0){
                return res.status(404).send({ message: "User not found"})
            }

            res.status(200).send(user)
        }
        catch(err){
            console.log(err)
        }
    }

    getUser();
}
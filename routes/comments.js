const express = require('express');
const router = express.Router();
var commentController = require("../controllers/commentController")
router.get('/add/:id', commentController.add_comment);
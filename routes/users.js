const express = require('express');

const router = express.Router();

var userController = require("../controllers/userController")

router.get('/', userController.users_list);
router.get('/register', userController.user_create_get);
router.post('/register', userController.user_create_post);
router.get('/login',userController.user_login_get)
router.post('/login', userController.user_login_post);
router.get('/:username', userController.get_user_by_username);
router.delete('/:username', userController.user_delete);
router.put('/:username', userController.user_update);

module.exports = router;

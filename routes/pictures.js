// make routes
const express = require('express');
const router = express.Router();
const pictureController = require("../controllers/pictureController")
var authenticate = require("../middleware/authenticate")
router.get('/',authenticate, pictureController.pictures_list);

router.get('/create', pictureController.picture_create_get);
router.post('/create', pictureController.picture_create_post);

router.post('/delete/', pictureController.picture_delete);

router.get("/update/:id", pictureController.picture_update_get);
router.post("/update/:id", pictureController.picture_update_post);

router.get("/:id", pictureController.picture_by_id)
module.exports = router;
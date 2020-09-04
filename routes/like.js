const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

const likeCtrl = require('../controllers/like');

const multer = require('../middleware/multer-config');


router.post('/:id/like', auth, multer, likeCtrl.manageLike);

module.exports = router;
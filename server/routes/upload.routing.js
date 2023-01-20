const express = require('express')
const router = express.Router()
const { auth, admin } = require('../middleware')
const uploadCtrl = require("../controllers/upload.controller");

router.post('/create',[auth, admin], uploadCtrl.post);

router.post('/destroy',[auth, admin], uploadCtrl.delete);

module.exports = router;
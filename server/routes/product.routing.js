const express = require('express')
const router = express.Router()
const { auth, admin } = require('../middleware')

const productCtrl = require('../controllers/product.controller')

/**
 * @route GET api/product
 * @desc Get product
 * @access Private
*/
router.get('/', productCtrl.getAll)

/**
 * @route POST api/product
 * @desc Post product
 * @access Private
*/
router.post('/', [auth, admin], productCtrl.create)

/**
 * @route PUT api/product
 * @desc Put product
 * @access Private
*/
router.put('/:id', [auth, admin], productCtrl.update)

/**
 * @route DELETE api/product
 * @desc Delete product
 * @access Private
*/
router.delete('/:id', [auth, admin], productCtrl.delete)

module.exports = router;
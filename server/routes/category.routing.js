const router = require("express").Router();
const { auth, admin } = require("../middleware");
const categoryCtrl = require("../controllers/category.controller");

/**  
 * @route GET api/category
 * @desc Get all categories
 * @access Public
*/
router.get('/', [auth, admin], categoryCtrl.getAll);

/**  
 * @route POST api/category
 * @desc Post category
 * @access Public
*/
router.post('/', [auth, admin], categoryCtrl.create);

/**  
 * @route PATCH api/category
 * @desc Patch category
 * @access Public
*/
router.patch('/:id', [auth, admin], categoryCtrl.update);

/**  
 * @route DELETE api/category
 * @desc Delete category
 * @access Public
*/
router.delete('/:id', [auth, admin], categoryCtrl.delete);

module.exports = router;
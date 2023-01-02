const router = require("express").Router();
const verifyToken = require("../middleware/auth.middleware");
const categoryCtrl = require("../controllers/category.controller");

/**  
 * @route GET api/category
 * @desc Get all categories
 * @access Public
*/
router.get('/', verifyToken, categoryCtrl.getAll);

module.exports = router;
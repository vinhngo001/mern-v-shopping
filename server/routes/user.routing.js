const router = require("express").Router();
const verifyToken = require("../middleware/auth.middleware");
const userCtrl = require("../controllers/user.controller");

/**  
 * @route GET api/auth
 * @desc Check if user is logged in
 * @access Public
*/
router.get('/', verifyToken, userCtrl.getUser);

module.exports = router;
const router = require("express").Router();
const { auth } = require("../middleware");
const userCtrl = require("../controllers/user.controller");

/**  
 * @route GET api/auth
 * @desc Check if user is logged in
 * @access Public
*/
router.get('/', auth, userCtrl.getUser);

module.exports = router;
const router = require("express").Router();
const { auth } = require("../middleware");
const userCtrl = require("../controllers/user.controller");

/**  
 * @route GET api/auth
 * @desc Check if user is logged in
 * @access Public
*/
router.get('/', auth, userCtrl.getUser);

/**  
 * @route POST api/user/add-to-cart
 * @desc Add new product to cart
 * @access Public
*/
router.put('/add-to-cart', auth, userCtrl.addCart);

module.exports = router;
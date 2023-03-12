const router = require("express").Router();
const { auth, admin } = require("../middleware");
const paymentCtrl = require("../controllers/payment.controller");

/**  
 * @route GET api/payment
 * @desc Get all payments of user
 * @access Public
*/
router.get('/', [auth, admin], paymentCtrl.getPayments);

/**  
 * @route POST api/payment
 * @desc Add new transaction to processed
 * @access Public
*/
router.post('/', auth, paymentCtrl.createPayment);

/**  
 * @route POST api/payment/histories
 * @desc Add view all transaction from users
 * @access Public
*/
router.get('/', auth, paymentCtrl.history);

module.exports = router;
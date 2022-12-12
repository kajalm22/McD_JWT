const express = require ("express")
const router = express.Router()
const {getOrders, createOrder,  updateOrder, deleteOrder} = require("../controllers/orderController")
const {protect} = require("../middleware/authMiddleware")


router.route("/get").get( protect,getOrders)

router.route("/placeOrder").post(protect, createOrder)

router.route("/cancel/:id").delete( protect,deleteOrder)

router.route("/update/:id").put( protect,updateOrder)



module.exports = router
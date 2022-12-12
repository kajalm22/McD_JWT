const express = require ("express")
const router = express.Router()
const {getOrders, createOrder, deleteOrder, updateOrder} = require("../controllers/orderController")
const {protect} = require("../middleware/authMiddleware")


router.route("/get").get(protect, getOrders)

router.route("/placeOrder").post(protect, createOrder)

router.route("/delete/:id").delete( protect,deleteOrder)

router.route("/update/:id").put( protect,updateOrder)



module.exports = router
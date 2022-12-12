
const Order = require("../models/orderModel")
const User = require("../models/userModel")


const getOrders = (async (req, res) => {
  const orders = await Order.find({ user: req.user.id })
  res.status(200).json(orders)
})

const createOrder = (async (req, res) => {
  if (!req.body.order) {
    res.status(400)

    throw new Error("Please add a text field")
  }

  const newOrder = await Order.create({
    order: req.body.order,
    user: req.user.id,
  })

  res.status(200).json(newOrder)
})



const updateOrder = (async (req, res) => {
  const order = await Order.findById(req.params.id)
  // console.log("🚀 ~ file: orderController.js:57 ~ updateOrder ~ order", order)
  
  if (!order) {
    res.status(400)

    throw new Error("Order not found")
  }

  

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(400)

    throw new Error("User not found")
  }

  if (order.user.toString() != user.id) {
    res.status(401)

    throw new Error("User not authorized");
  }

  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body,{
    new: true,
  })
    // console.log("🚀 ~ file: orderController.js:82 ~ updateOrder ~ updatedOrder", updatedOrder)
    

  res.status(200).json(updatedOrder);
})


const deleteOrder = (async (req, res) => {
  const order = await Order.findById(req.params.id)

if (!order) {
  res.status(400)

  throw new Error("Order not found")
}

const user = await User.findById(req.user.id)

if (!user) {
  res.status(401)

  throw new Error("User not found")
}

if (order.user.toString() != user.id) {
  res.status(401)

  throw new Error("User is not authorized")
}

const deletedOrder = await order.deleteOne()
res.status(200).json({msg : "Order deleted successfully"})
})


module.exports = { getOrders , createOrder , updateOrder , deleteOrder}

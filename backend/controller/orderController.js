const Order=require("../model/orderModel")

//@desc create new order
//@route POST /api/orders
//@access Private

const addOrderItems = async (req, res) => {
    try {
         const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
  } = req.body
//   console.log(orderItems)
  if (orderItems && orderItems.length === 0) {
        throw new Error('No order items')
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    // console.log("jjj")
    const createdOrder = await order.save()
    // console.log("success")
    res.status(201).json(createdOrder)
  }
    } catch (error) {
        console.log(error.message)
        res.status(400).send(error.message)
    }
}


//@desc get order by id
//@route GET /api/orders/:id
//@access Private
const getOrderById=async(req,res)=>{
    try {
        const order=await Order.findById(req.params.id).populate("user","email name");
        if(order){
            res.json(order)
        }
        else{
            throw new Error("Order not found")
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

//@desc update order to paid
//@route PUT /api/orders/:id/pay
//@access Private
const updateOrderToPaid=async(req,res)=>{
    try {
        const order=await Order.findById(req.params.id)
        if(order){
            order.isPaid=true
            order.paidAt=Date.now();
            order.paymentResult={
                    id: req.body.id,
                    status: req.body.status,
                    update_time: req.body.update_time,
                    email_address: req.body.payer.email_address,
            }
            const updateOrder=await order.save()
            res.json(updateOrder)
        }
        else{
            throw new Error("Order not found")
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user:req.user._id})
        res.json(orders)
    } catch (error) {
        res.status(400).send(error.message)
    }
}




module.exports={
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders
}


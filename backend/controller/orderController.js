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


module.exports={
    addOrderItems
}


import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

//create a new stripe package
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing user order from frontend
const placeorder = async (req, res) => {
  //frontend_url
  const frontend_url = "http://localhost:5173";
  //creatting the new order
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    //saving the new order in to the DB
    await newOrder.save();

    //after that we cleaning the user cartData
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    //create the stripe payment link

    //First we have to create line items were we will insert the products data, currency, unit amount and quantity

    //whatever item we get from the user we are using that item we creating the line_items that are neccessary for the stripe items
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80, // 1 dollar = 80 rupees
      },
      quantity: item.quantity,
    }));

    //after adding line_items we adding one more entry which is delivery charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80, // 1 dollar = 80 rupees
      },
      quantity: 1,
    });

    //after that using this line_items, payment mode, success_url, cancel_url we have created one session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    //after that we have sent the session_url as response
    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

//verify order api
const verifyOrder = async (req, res) => {
  // Get orderId and success from req.body
  const { orderId, success } = req.body;

  try {
    // Check if success is "true"
    if (success === "true") {
      // If success is true, update the order status to paid
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
      });
      res.json({
        success: true,
        message: "Paid",
      });
    } else if (success === "false") {
      // If success is false, delete the order
      await orderModel.findByIdAndDelete(orderId);
      res.json({
        success: false,
        message: "Not paid",
      });
    } else {
      // Handle the case where success is neither "true" nor "false"
      res.json({
        success: false,
        message: "Invalid success value",
      });
    }
  } catch (error) {
    // Log and handle any errors
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

//users orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({
      success: true,
      data: orders,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

//find all the orders for  admin
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({
      success: true,
      data: orders,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

//api for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({
      success: true,
      message: "Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

export { placeorder, verifyOrder, userOrders, listOrders, updateStatus };

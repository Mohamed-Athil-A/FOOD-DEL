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
  //we are getting orderId from body
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      //if success is true then we are updating the order status to paid
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
      });
      res.json({
        success: true,
        message: "Paid",
      });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({
        success: false,
        message: "Not paid",
      });
    }
  } catch (error) {
    console.log(err);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

export { placeorder, verifyOrder };

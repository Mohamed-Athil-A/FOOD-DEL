import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    default: "Food Processing",
<<<<<<< HEAD
    enum: ["Food Processing", "Food Delivered", "Out For Delivery"],
=======
    enum: ["Food Processing", "Food Delivered", "Out For Delivery"], 
>>>>>>> 7cf285bc7c0bb5f489173dba209c5c54030842bb
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  payment: {
    type: Boolean,
<<<<<<< HEAD
    default: false,
=======
    default: "Payment Pending",
    enum: ["Payment Pending", "Payment Received", "Payment Cancelled"],
>>>>>>> 7cf285bc7c0bb5f489173dba209c5c54030842bb
  },
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;

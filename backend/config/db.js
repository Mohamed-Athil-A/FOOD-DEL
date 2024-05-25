//create a logic which connect to the database

import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://mohamedathil2904:Athil2001@cluster0.vh2vmae.mongodb.net/food-del?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("DB Connected"));
};

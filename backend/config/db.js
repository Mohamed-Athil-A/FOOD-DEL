//create a logic which connect to the database

import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
<<<<<<< HEAD
      "mongodb+srv://mohamedathil2904:Athil2001@cluster0.vh2vmae.mongodb.net/food-del"
=======
      "mongodb+srv://mohamedathil2904:Athil2001@cluster0.vh2vmae.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"
>>>>>>> 7cf285bc7c0bb5f489173dba209c5c54030842bb
    )
    .then(() => console.log("DB Connected"));
};

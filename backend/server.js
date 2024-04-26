import expres from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import "dotenv/config";
import orderRouter from "./routes/orderRoute.js";

//app config
const app = expres();
const PORT = 4000;

//middleware
app.use(expres.json()); //whenever we get the req from frontend to backend we parse the data into JSON format and then we can use it

app.use(cors()); //we can access the backend from any frontend

//DB connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter);

//showing the image to the client(frontend) from the server(backend) we need to create a static folder and then we need to create a route for it
app.use("/images", expres.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

import express from "express";
import {
  addFood,
  getAllFood,
  removeFood,
} from "../controllers/foodController.js";
import multer from "multer";
import path from "path";

const foodRouter = express.Router();

//image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    return cb(null, `${Date.now()}${fileExtension}`);
  },
});

// Define file filter for images with specific extensions
const allowedFileExtensions = [".png", ".svg", ".jpeg"];
const fileFilter = (req, file, cb) => {
  const isValidFile = allowedFileExtensions.includes(
    path.extname(file.originalname).toLowerCase()
  );
  if (isValidFile) {
    cb(null, true); // Accept image file
  } else {
    cb(new Error("Only .png, .svg, and .jpeg files are allowed!"), false); // Reject file
  }
};

const upload = multer({ storage, fileFilter });

//To add middlware to the route upload.single("image")
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", getAllFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;

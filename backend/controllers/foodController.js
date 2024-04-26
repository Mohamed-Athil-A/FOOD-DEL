import foodModel from "../models/foodModel.js";
import fs from "fs";

//add foof item

const addFood = async (req, res) => {
  // console.log(req.file);
  // console.log(req.body);

  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.status(201).json({ success: true, message: "Food Added Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Food Not Added" });
  }
};

//get all food items
const getAllFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(200).json({ success: true, result: foods.length, data: foods });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Food not found" });
  }
};

//remove food item

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findByIdAndDelete(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    res.json({ success: true, message: "Food removed successfully" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Food Not Found" });
  }
};

export { addFood, getAllFood, removeFood };

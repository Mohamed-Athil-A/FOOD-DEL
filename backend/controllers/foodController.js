import foodModel from "../models/foodModel.js";
import fs from "fs";

//add foof item

const addFood = async (req, res) => {
  // console.log(req.file);
  // console.log(req.body);

  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ success: true, message: "Food Added Successfully" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Food Not Added" });
  }
};

//get all food items
const getAllFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, result: foods.length, data: foods });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Food not found" });
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
const filterFood = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm.toLowerCase();
    const regex = new RegExp(searchTerm, "i"); // Case-insensitive regex

    // Search for any part of the food name that matches the search term
    const matchedFoods = await foodModel.find({
      $or: [{ name: regex }, { category: regex }],
    });

    if (matchedFoods.length > 0) {
      // Map through all matched food items and extract necessary fields
      const filteredFoods = matchedFoods.map((food) => ({
        _id: food._id,
        name: food.name,
        description: food.description,
        image: food.image,
        price: food.price,
        category: food.category,
      }));
      res.json({
        success: true,
        data: filteredFoods,
      }); // Return array of matched food items
    } else {
      res.json({ description: "No matching food found" });
    }
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

export { addFood, getAllFood, removeFood, filterFood };

import Category from "../models/catagoryModel.js";

const addCategory = async (req, res) => {
  const { name, image } = req.body;
  const newCategory = new Category({
    name,
    image,
  });
  try {
    await newCategory.save();
    res.status(201).json({
      success: true,
      data: newCategory,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export default addCategory;

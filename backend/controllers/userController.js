import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//Login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //checking if user exists
    const user = await userModel.findOne({ email: email });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "User doesn't exists",
      });
    }

    //checking the exists password and user given password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    //if the password is matching we need to generate the token
    const token = createToken(user._id);

    //after creating token we will send this token to response
    res.status(200).json({
      success: true,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "Error",
    });
  }
};

const createToken = (id) => {
  //jwt.sign() to create a new jwt token
  //The first arguement is an object `{id}`
  //The second arguement is the secret key
  //The third arguement is the options object

  return jwt.sign({ id: id }, process.env.JWT_SECRET);
};

//register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //checking if user already exists
    const exists = await userModel.findOne({ email: email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    //validating email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    //cheking strong password
    if (password.length < 8) {
      res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    //after checking the email and pass if its valid we need to encrypt that and create a account

    //hasing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating a new user
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    //save the newUser
    const user = await newUser.save();

    //creating token (we will send that token using to the response to the user)
    const token = createToken(user._id);
    res.json({
      success: true,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "Error",
    });
  }
};

export { loginUser, registerUser };

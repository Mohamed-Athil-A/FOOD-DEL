import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
);

//When minimize is set to false, it tells Mongoose not to remove empty objects ({}) from documents when converting them to JSON. By default, Mongoose will remove empty objects during serialization. This behavior is helpful in some cases to reduce the size of the stored documents, especially when working with deeply nested schemas where many objects might be empty.


//if user exists in the mongoose model use them otherwise create a new model for them
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;

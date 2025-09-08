import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
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
  role: {
    type: String,
    enum: ["user", "student"],
    default: "user",
  },
  books: [{
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    isbn: String,
    bookLink: String,
    bookType: {
      type: String,
      enum: ["philosophy", "love", "emotional", "self", "holy", "other"],
      default: "other"
    },
    addedDate: {
      type: Date,
      default: Date.now
    }
  }]
});

const User = mongoose.model("User", userSchema);

export default User;
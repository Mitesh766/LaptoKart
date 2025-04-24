import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    orders: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Order",
          required: true,
          validate: {
            validator: function (v) {
              return mongoose.Types.ObjectId.isValid(v);
            },
            message: "Invalid Order ID",
          },
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    wishlist: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
          validate: {
            validator: function (v) {
              return mongoose.Types.ObjectId.isValid(v);
            },
            message: "Invalid Product ID",
          },
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    cart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
          validate: {
            validator: function (v) {
              return mongoose.Types.ObjectId.isValid(v);
            },
            message: "Invalid Product ID",
          },
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: String },
      country: { type: String, default: "India" },
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

export default mongoose.model("User", userSchema);

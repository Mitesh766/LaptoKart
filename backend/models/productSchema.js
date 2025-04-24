import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Please provide brand name"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Please provide category"],
      enum: [
        "Gaming",
        "Business",
        "Ultrabook",
        "Student",
        "2-in-1",
        "Workstation",
        "Chromebook",
      ],
    },
    processor: {
      type: String,
    },
    ram: {
      type: String,
    },
    storage: {
      type: String,
    },
    screenSize: {
      type: String,
    },
    graphicsCard: {
      type: String,
    },
    operatingSystem: {
      type: String,
    },
    image: [{
      type: String,
      default: "/images/sample.jpg", // or store cloudinary path
    }],
    ratings: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        name: String,
        rating: Number,
        comment: String,
      },
    ],
    seller: {
      type: String,
      default: "LaptopKart",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

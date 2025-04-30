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
      enum: [
        "HP",
        "Dell",
        "Lenovo",
        "Asus",
        "Acer",
        "MSI",
        "Apple",
        "Samsung",
        "Microsoft"
      ],
    },
    description: {
      type: [String],
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
        "Gaming Laptops",
        "Business & Office",
        "Student Laptops",
        "2-in-1 Convertibles",
        "Workstations",
        "Chromebooks",
        "Everyday Use",
        "Ultrabooks",
        "Creator & Editing",
        "MacBook"
      ],
    },
    processor: {
      type: String,
    },
    ram: {
      type: String,
      enum: ["4GB", "8GB", "16GB", "32GB", "64GB"],
    },
    storage: {
      type: String,
      enum: ["128GB SSD", "256GB SSD", "512GB SSD", "1TB HDD", "1TB SSD"],
    },
    screenSize: {
      type: String,
    },
    graphicsCard: {
      type: String,
    },
    operatingSystem: {
      type: String,
      enum: ["Windows", "macOS", "Linux", "ChromeOS"],
    },
    image: [
      {
        type: String,
      },
    ],
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

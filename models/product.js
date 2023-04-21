const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 200,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500000,
      text: true,
    },
    detail: {
      type: {},
      min: 10,
      max: 500000
    },
    content: {
      type: {},
      min: 10,
      max: 5000000
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subs: [
      {
        type: ObjectId,
        ref: "Sub",
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    color: {
      type: String,
      enum: ["Black", "Brown", "Silver", "White", "Blue", "Red", "Green"],
    },
    brand: {
      type: String,
      enum: ["Espressif", "Atmel", "Phillips", "Microchip", "Analog Device", "STMicroelectronics", "Parallax", "Cypress", "Texas Intruments", "Motorola", "Zilog", "Rabbit Semiconductor", "Renesas",
        "Sumsung", "Panasonic", "Sony", "Acer", "Apple", "Aston", "Dell", "Fujifilm", "GoPro", "HP", "JBL", "Lenovo", "LG", "Microsoft", "Sandisk", "WD", "Zotac", "No Brand",],
    },
    // brand: {
    //   type: ObjectId,
    //   ref: "Brand",
    // },
    // generation:   [
    //   {
    //     type: ObjectId,
    //     ref: "Generation",
    //   },
    // ],
    ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

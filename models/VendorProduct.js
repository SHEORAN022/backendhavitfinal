// const mongoose = require("mongoose");

// const VendorProductSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: String,

//     restaurantName: { type: String, required: true },

//     oldPrice: Number,
//     newPrice: { type: Number, required: true },
//     quality: String,
//     stock: Number,

//     religion: String,
//     productTypes: String,
//     flavors: String,
//     dietPreference: String,
//     nutrition: String,
//     materialTypes: String,
//     ingredients: String,
//     allergenInfo: String,
//     dietaryPreferences: String,
//     cuisine: String,
//     size: String,

//     image: String,
//     logo: String,
//     gallery: [String],

//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "VendorCategory",
//       required: true,
//     },
//     subcategory: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "VendorSubCategory",
//     },

//     vendor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("VendorProduct", VendorProductSchema);


const mongoose = require("mongoose");

const VendorProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    restaurantName: { type: String, required: true },
    
    // 🔥 Nayi Fields jo aapne mangi
    brandName: { type: String, required: true },
    phone: { type: String, required: true },
    contactName: { type: String, required: true },

    oldPrice: Number,
    newPrice: { type: Number, required: true },
    quality: String,
    stock: Number,

    religion: String,
    productTypes: String,
    flavors: String,
    dietPreference: String,
    nutrition: String,
    materialTypes: String,
    ingredients: String,
    allergenInfo: String,
    dietaryPreferences: String,
    cuisine: String,
    size: String,

    image: String,
    logo: String,
    gallery: [String],

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VendorCategory",
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VendorSubCategory",
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VendorProduct", VendorProductSchema);

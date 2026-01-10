
// // const mongoose = require("mongoose");

// // const vendorSchema = new mongoose.Schema(
// //   {
// //     // --- Step 1 Fields ---
// //     contactName: { type: String, required: [true, "Contact name is required"] },
// //     phone: { type: String, required: [true, "Phone number is required"] },
// //     email: { 
// //       type: String, 
// //       required: [true, "Email is required"], 
// //       unique: true, 
// //       lowercase: true, 
// //       trim: true 
// //     },
// //     password: { type: String, required: [true, "Password is required"] },
// //     vendorType: { 
// //       type: String, 
// //       enum: ["Distributor", "Direct Vendor", "Indirect Vendor"], 
// //       default: "Direct Vendor" 
// //     },
// //     brandName: { type: String, required: [true, "Brand name is required"] },

// //     // --- Step 2 Fields ---
// //     annualTurnover: { type: String },
// //     onlineTurnover: { type: String },
// //     minSellingPrice: { type: String },
// //     maxSellingPrice: { type: String },
// //     website: { type: String },
// //     presence: { type: [String], default: [] },
// //     demographic: { type: String, default: "Pan India" },

// //     // --- Step 3 Fields (Documents - Storing Cloudinary URLs & Numbers) ---
// //     gstNumber: { type: String },
// //     gstFile: { type: String }, // Cloudinary URL

// //     panNumber: { type: String },
// //     panFile: { type: String }, // Cloudinary URL

// //     aadharNumber: { type: String },
// //     aadharFile: { type: String }, // Cloudinary URL

// //     fssaiFile: { type: String }, // Cloudinary URL
// //     msmeFile: { type: String },  // Cloudinary URL
// //     ownerPhoto: { type: String }, // Cloudinary URL
// //     supportingDoc: { type: String }, // Optional Cloudinary URL

// //     // --- Status Control ---
// //     status: { 
// //       type: String, 
// //       enum: ["PENDING", "APPROVED", "REJECTED"], 
// //       default: "PENDING" 
// //     },
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);


// const mongoose = require("mongoose");

// const VendorProductSchema = new mongoose.Schema(
//   {
//     /** BASIC PRODUCT INFO **/
//     name: { type: String, required: true, trim: true },
//     description: { type: String, default: "" },

//     /** VENDOR STORE **/
//     restaurantName: { type: String, required: true, trim: true },

//     /** REQUIRED VENDOR CONTACT FIELDS **/
//     brandName: { type: String, required: true, trim: true },
//     phone: { type: String, required: true, trim: true },
//     contactName: { type: String, required: true, trim: true },

//     /** PRICING **/
//     oldPrice: { type: Number, default: 0 },
//     newPrice: { type: Number, required: true },
//     stock: { type: Number, default: 0 },
//     quality: { type: String, default: "" },

//     /** FOOD / GROCERIES SPECIFIC **/
//     religion: { type: String, default: "" },
//     productTypes: { type: String, default: "" },
//     flavors: { type: String, default: "" },
//     dietPreference: { type: String, default: "" },
//     nutrition: { type: String, default: "" },
//     materialTypes: { type: String, default: "" },
//     ingredients: { type: String, default: "" },
//     allergenInfo: { type: String, default: "" },
//     dietaryPreferences: { type: String, default: "" },
//     cuisine: { type: String, default: "" },
//     size: { type: String, default: "" },

//     /** IMAGES **/
//     image: { type: String, default: "" }, // main image
//     logo: { type: String, default: "" },
//     gallery: {
//       type: [String],
//       default: [],
//     },

//     /** CATEGORY LINK **/
//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "VendorCategory",
//       required: true,
//       index: true,
//     },

//     subcategory: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "VendorSubCategory",
//       default: null,
//       index: true,
//     },

//     /** VENDOR **/
//     vendor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       required: true,
//       index: true,
//     },
//   },
//   { timestamps: true }
// );

// /** EXTRA PERFORMANCE INDEXES **/
// VendorProductSchema.index({ vendor: 1, category: 1 });
// VendorProductSchema.index({ vendor: 1, subcategory: 1 });
// VendorProductSchema.index({ vendor: 1, name: 1 });

// module.exports = mongoose.model("VendorProduct", VendorProductSchema);


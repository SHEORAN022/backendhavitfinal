// const mongoose = require("mongoose");

// const vendorSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     password: {
//       type: String,
//       required: true,
//     },

//     status: {
//       type: String,
//       enum: ["PENDING", "APPROVED", "REJECTED"],
//       default: "PENDING",
//     },
//   },
//   { timestamps: true }
// );

// // ✅ SAFE EXPORT (nodemon friendly)
// module.exports =
//   mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);


const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    // --- Step 1 Fields ---
    contactName: { type: String, required: [true, "Contact name is required"] },
    phone: { type: String, required: [true, "Phone number is required"] },
    email: { 
      type: String, 
      required: [true, "Email is required"], 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    password: { type: String, required: [true, "Password is required"] },
    vendorType: { 
      type: String, 
      enum: ["Distributor", "Direct Vendor", "Indirect Vendor"], 
      default: "Direct Vendor" 
    },
    brandName: { type: String, required: [true, "Brand name is required"] },

    // --- Step 2 Fields ---
    annualTurnover: { type: String },
    onlineTurnover: { type: String },
    minSellingPrice: { type: String },
    maxSellingPrice: { type: String },
    website: { type: String },
    presence: { type: [String], default: [] },
    demographic: { type: String, default: "Pan India" },

    // --- Step 3 Fields (Documents - Storing Cloudinary URLs & Numbers) ---
    gstNumber: { type: String },
    gstFile: { type: String }, // Cloudinary URL

    panNumber: { type: String },
    panFile: { type: String }, // Cloudinary URL

    aadharNumber: { type: String },
    aadharFile: { type: String }, // Cloudinary URL

    fssaiFile: { type: String }, // Cloudinary URL
    msmeFile: { type: String },  // Cloudinary URL
    ownerPhoto: { type: String }, // Cloudinary URL
    supportingDoc: { type: String }, // Optional Cloudinary URL

    // --- Status Control ---
    status: { 
      type: String, 
      enum: ["PENDING", "APPROVED", "REJECTED"], 
      default: "PENDING" 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);

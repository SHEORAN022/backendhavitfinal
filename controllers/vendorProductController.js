

// // const VendorProduct = require("../models/VendorProduct");

// // /* GET ALL PRODUCTS */
// // exports.getVendorProducts = async (req, res) => {
// //   try {
// //     const products = await VendorProduct.find({
// //       vendor: req.vendor._id,
// //     })
// //       .populate("category", "_id name")
// //       .populate("subcategory", "_id name parent");

// //     res.json({ success: true, data: products });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // /* CREATE PRODUCT */
// // exports.createVendorProduct = async (req, res) => {
// //   try {
// //     const product = await VendorProduct.create({
// //       ...req.body,
// //       vendor: req.vendor._id,
// //     });

// //     res.status(201).json(product);
// //   } catch (err) {
// //     res.status(400).json({ message: err.message });
// //   }
// // };

// // /* UPDATE PRODUCT */
// // exports.updateVendorProduct = async (req, res) => {
// //   try {
// //     const updated = await VendorProduct.findOneAndUpdate(
// //       { _id: req.params.id, vendor: req.vendor._id },
// //       req.body,
// //       { new: true }
// //     );

// //     if (!updated)
// //       return res.status(404).json({ message: "Product not found" });

// //     res.json(updated);
// //   } catch (err) {
// //     // based on the user's language preference (Hindi Hinglish)
// //     res.status(400).json({ message: err.message });
// //   }
// // };

// // /* DELETE PRODUCT */
// // exports.deleteVendorProduct = async (req, res) => {
// //   try {
// //     const deleted = await VendorProduct.findOneAndDelete({
// //       _id: req.params.id,
// //       vendor: req.vendor._id,
// //     });

// //     if (!deleted)
// //       return res.status(404).json({ message: "Product not found" });

// //     res.json({ message: "Product deleted" });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };









// const VendorProduct = require("../models/VendorProduct");
// const Vendor = require("../models/Vendor");
// const cloudinary = require("../config/cloudinary");

// /* ================= GET ================= */
// exports.getVendorProducts = async (req, res) => {
//   try {
//     const products = await VendorProduct.find({
//       vendor: req.vendor._id,
//     })
//       .populate("category", "name")
//       .populate("subcategory", "name");

//     res.json({ success: true, data: products });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /* ================= CREATE ================= */
// exports.createVendorProduct = async (req, res) => {
//   try {
//     const vendor = await Vendor.findById(req.vendor._id);

//     // 🔥 store name one-time
//     if (!vendor.storeName && req.body.restaurantName) {
//       vendor.storeName = req.body.restaurantName;
//       await vendor.save();
//     }

//     if (!vendor.storeName) {
//       return res.status(400).json({
//         needStoreName: true,
//         message: "Store name required",
//       });
//     }

//     let image = "";
//     let logo = "";
//     let gallery = [];

//     if (req.files?.image) {
//       const i = await cloudinary.uploader.upload(
//         `data:${req.files.image[0].mimetype};base64,${req.files.image[0].buffer.toString("base64")}`
//       );
//       image = i.secure_url;
//     }

//     if (req.files?.logo) {
//       const l = await cloudinary.uploader.upload(
//         `data:${req.files.logo[0].mimetype};base64,${req.files.logo[0].buffer.toString("base64")}`
//       );
//       logo = l.secure_url;
//     }

//     if (req.files?.gallery) {
//       for (let g of req.files.gallery) {
//         const up = await cloudinary.uploader.upload(
//           `data:${g.mimetype};base64,${g.buffer.toString("base64")}`
//         );
//         gallery.push(up.secure_url);
//       }
//     }

//     const product = await VendorProduct.create({
//       ...req.body,
//       image,
//       logo,
//       gallery,
//       vendor: vendor._id,
//       restaurantName: vendor.storeName,
//     });

//     res.status(201).json({ success: true, data: product });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /* ================= UPDATE ================= */
// exports.updateVendorProduct = async (req, res) => {
//   try {
//     const product = await VendorProduct.findOne({
//       _id: req.params.id,
//       vendor: req.vendor._id,
//     });

//     if (!product)
//       return res.status(404).json({ message: "Product not found" });

//     Object.assign(product, req.body);
//     await product.save();

//     res.json({ success: true, data: product });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /* ================= DELETE ================= */
// exports.deleteVendorProduct = async (req, res) => {
//   try {
//     const deleted = await VendorProduct.findOneAndDelete({
//       _id: req.params.id,
//       vendor: req.vendor._id,
//     });

//     if (!deleted)
//       return res.status(404).json({ message: "Product not found" });

//     res.json({ success: true, message: "Product deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const VendorProduct = require("../models/VendorProduct");
const Vendor = require("../models/Vendor");
const cloudinary = require("../config/cloudinary");

/* ================= GET ================= */
exports.getVendorProducts = async (req, res) => {
  try {
    const products = await VendorProduct.find({
      vendor: req.vendor._id,
    })
      .populate("category", "name")
      .populate("subcategory", "name");

    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= CREATE ================= */
exports.createVendorProduct = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.vendor._id);

    // 🔥 STORE NAME ONE TIME
    if (!vendor.storeName && req.body.restaurantName) {
      vendor.storeName = req.body.restaurantName;
      await vendor.save();
    }

    if (!vendor.storeName) {
      return res.status(400).json({
        needStoreName: true,
        message: "Store name required",
      });
    }

    let image = "";
    let logo = "";
    let gallery = [];

    if (req.files?.image) {
      const img = await cloudinary.uploader.upload(
        `data:${req.files.image[0].mimetype};base64,${req.files.image[0].buffer.toString("base64")}`
      );
      image = img.secure_url;
    }

    if (req.files?.logo) {
      const lg = await cloudinary.uploader.upload(
        `data:${req.files.logo[0].mimetype};base64,${req.files.logo[0].buffer.toString("base64")}`
      );
      logo = lg.secure_url;
    }

    if (req.files?.gallery) {
      for (let g of req.files.gallery) {
        const up = await cloudinary.uploader.upload(
          `data:${g.mimetype};base64,${g.buffer.toString("base64")}`
        );
        gallery.push(up.secure_url);
      }
    }

    const product = await VendorProduct.create({
      ...req.body,
      image,
      logo,
      gallery,
      vendor: vendor._id,
      restaurantName: vendor.storeName, // 🔥 AUTO
    });

    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE ================= */
exports.updateVendorProduct = async (req, res) => {
  try {
    const product = await VendorProduct.findOne({
      _id: req.params.id,
      vendor: req.vendor._id,
    });

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    Object.assign(product, req.body);
    await product.save();

    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE ================= */
exports.deleteVendorProduct = async (req, res) => {
  try {
    const deleted = await VendorProduct.findOneAndDelete({
      _id: req.params.id,
      vendor: req.vendor._id,
    });

    if (!deleted)
      return res.status(404).json({ message: "Product not found" });

    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

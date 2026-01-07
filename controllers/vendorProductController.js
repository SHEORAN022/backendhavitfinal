const VendorProduct = require("../models/VendorProduct");
const Vendor = require("../models/Vendor");
const cloudinary = require("../config/cloudinary");

/* ================= GET (VENDOR PANEL) ================= */
exports.getVendorProducts = async (req, res) => {
  try {
    const products = await VendorProduct.find({
      vendor: req.vendor._id,
    })
      .populate("category", "name")
      .populate("subcategory", "name")
      .populate("vendor", "_id storeName"); // 🔥 safe

    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= CREATE ================= */
exports.createVendorProduct = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.vendor._id);

    // 🔥 store name one-time save
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
      restaurantName: vendor.storeName,
    });

    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE (FIXED) ================= */
exports.updateVendorProduct = async (req, res) => {
  try {
    const product = await VendorProduct.findOne({
      _id: req.params.id,
      vendor: req.vendor._id,
    });

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    // text fields
    Object.assign(product, req.body);

    // 🔥 image updates
    if (req.files?.image) {
      const img = await cloudinary.uploader.upload(
        `data:${req.files.image[0].mimetype};base64,${req.files.image[0].buffer.toString("base64")}`
      );
      product.image = img.secure_url;
    }

    if (req.files?.logo) {
      const lg = await cloudinary.uploader.upload(
        `data:${req.files.logo[0].mimetype};base64,${req.files.logo[0].buffer.toString("base64")}`
      );
      product.logo = lg.secure_url;
    }

    if (req.files?.gallery) {
      product.gallery = [];
      for (let g of req.files.gallery) {
        const up = await cloudinary.uploader.upload(
          `data:${g.mimetype};base64,${g.buffer.toString("base64")}`
        );
        product.gallery.push(up.secure_url);
      }
    }

    await product.save();
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE ================= */
exports.deleteVendorProduct = async (req, res) => {
  await VendorProduct.findOneAndDelete({
    _id: req.params.id,
    vendor: req.vendor._id,
  });

  res.json({ success: true, message: "Product deleted" });
};

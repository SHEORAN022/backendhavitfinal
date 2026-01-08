const Product = require("../models/Product");
const VendorProduct = require("../models/VendorProduct");

exports.getPublicProducts = async (req, res) => {
  try {
    // 1️⃣ Fetch Admin Products
    const adminProducts = await Product.find()
      .populate("category", "name")
      .populate("subcategory", "name")
      .populate("vendor", "_id storeName")
      .lean();

    // 2️⃣ Fetch Vendor Products
    const vendorProducts = await VendorProduct.find()
      .populate("category", "name")
      .populate("subcategory", "name")
      .populate("vendor", "_id storeName")
      .lean();

    // 3️⃣ Format Vendor Products for Website
    const formattedVendor = vendorProducts.map(v => ({
      _id: v._id,
      name: v.name,
      description: v.description,
      restaurantName: v.restaurantName,
      oldPrice: v.oldPrice,
      newPrice: v.newPrice,
      quality: v.quality,
      stock: v.stock,
      image: v.image,
      logo: v.logo,
      gallery: v.gallery,
      category: v.category?.name || null,
      subcategory: v.subcategory?.name || null,
      vendor: v.vendor?.storeName || null,
      source: "vendor"
    }));

    // 4️⃣ Format Admin Products for Website
    const formattedAdmin = adminProducts.map(a => ({
      _id: a._id,
      name: a.name,
      description: a.description,
      restaurantName: a.restaurantName,
      oldPrice: a.oldPrice,
      newPrice: a.newPrice,
      quality: a.quality,
      stock: a.stock,
      image: a.image,
      logo: a.logo,
      gallery: a.gallery,
      category: a.category?.name || null,
      subcategory: a.subcategory?.name || null,
      vendor: a.vendor?.storeName || null,
      source: "admin"
    }));

    // 5️⃣ Merge Both
    const finalData = [...formattedAdmin, ...formattedVendor];

    // 6️⃣ Optional Sorting (Newest First)
    finalData.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    res.json({
      success: true,
      count: finalData.length,
      data: finalData
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


// const SubCategory = require("../models/SubCategory");

// // GET ALL SUB-CATEGORIES
// exports.getAllSubCategories = async (req, res) => {
//   try {
//     const data = await SubCategory.find().populate("parent", "_id name");
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // CREATE SUBCATEGORY
// exports.createSubCategory = async (req, res) => {
//   try {
//     const { name, parent } = req.body;
//     const image = req.file ? `/uploads/${req.file.filename}` : null;

//     const newSub = await SubCategory.create({ name, parent, image });
//     res.json(newSub);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // UPDATE SUBCATEGORY
// exports.updateSubCategory = async (req, res) => {
//   try {
//     const { name, parent } = req.body;
//     const updateData = { name, parent };

//     if (req.file) {
//       updateData.image = `/uploads/${req.file.filename}`;
//     }

//     const updatedSub = await SubCategory.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true }
//     );
//     res.json(updatedSub);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // DELETE SUBCATEGORY
// exports.deleteSubCategory = async (req, res) => {
//   try {
//     await SubCategory.findByIdAndDelete(req.params.id);
//     res.json({ message: "Deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };






// const SubCategory = require("../models/SubCategory");

// /* GET ALL SUBCATEGORIES */
// exports.getAllSubCategories = async (req, res) => {
//   try {
//     const data = await SubCategory.find()
//       .populate("parent", "_id name")
//       .sort({ createdAt: -1 });

//     res.json({ success: true, data });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* CREATE */
// exports.createSubCategory = async (req, res) => {
//   try {
//     const { name, parent } = req.body;
//     const image = req.file ? req.file.path : "";

//     const sub = await SubCategory.create({ name, parent, image });
//     res.status(201).json({ success: true, data: sub });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* UPDATE */
// exports.updateSubCategory = async (req, res) => {
//   try {
//     const { name, parent } = req.body;
//     const update = { name, parent };

//     if (req.file) update.image = req.file.path;

//     const sub = await SubCategory.findByIdAndUpdate(
//       req.params.id,
//       update,
//       { new: true }
//     );

//     res.json({ success: true, data: sub });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* DELETE */
// exports.deleteSubCategory = async (req, res) => {
//   try {
//     await SubCategory.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "SubCategory deleted" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };












import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://backendhavitfinal.vercel.app/api";

export default function SubCategories() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [image, setImage] = useState(null);

  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  /* ================= FETCH ================= */
  const fetchCategories = async () => {
    const res = await axios.get(`${API}/categories`);
    setCategories(res.data.data || []);
  };

  const fetchSubcategories = async () => {
    const res = await axios.get(`${API}/subcategories`);
    setSubcategories(res.data.data || []);
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  /* ================= OPEN FORM ================= */
  const openForm = () => {
    setEditId(null);
    setName("");
    setParent("");
    setImage(null);
    setShowForm(true);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !parent) return alert("Name & Category required");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("parent", parent);
    if (image) formData.append("image", image);

    if (editId) {
      await axios.put(`${API}/subcategories/${editId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      await axios.post(`${API}/subcategories`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    setShowForm(false);
    fetchSubcategories();
  };

  /* ================= EDIT ================= */
  const handleEdit = (sub) => {
    setEditId(sub._id);
    setName(sub.name);
    setParent(sub.parent?._id);
    setShowForm(true);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (window.confirm("Delete SubCategory?")) {
      await axios.delete(`${API}/subcategories/${id}`);
      fetchSubcategories();
    }
  };

  return (
    <div className="p-4">

      <button onClick={openForm} className="p-2 bg-blue-500 text-white">
        Add SubCategory
      </button>

      {/* FORM */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 border p-4 space-y-3">

          {/* CATEGORY */}
          <select
            value={parent}
            onChange={(e) => setParent(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* NAME */}
          <input
            type="text"
            placeholder="SubCategory Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
          />

          {/* IMAGE */}
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-2 w-full"
          />

          <div className="flex gap-3">
            <button type="submit" className="p-2 bg-green-600 text-white">
              {editId ? "Update" : "Add"}
            </button>

            <button type="button" onClick={() => setShowForm(false)} className="p-2 bg-gray-400">
              Cancel
            </button>
          </div>

        </form>
      )}

      {/* TABLE */}
      <table className="w-full border mt-6">
        <thead>
          <tr className="border bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>

        <tbody>
          {subcategories.length === 0 && (
            <tr>
              <td colSpan="4" className="p-4 text-center">
                No SubCategories Found
              </td>
            </tr>
          )}

          {subcategories.map((sub) => (
            <tr key={sub._id} className="border">
              <td className="p-2 border">{sub.name}</td>
              <td className="p-2 border">{sub.parent?.name}</td>
              <td className="p-2 border">
                {sub.image && (
                  <img
                    src={`https://backendhavitfinal.vercel.app/${sub.image}`}
                    width="45"
                    height="45"
                    style={{ objectFit: "cover", borderRadius: "4px" }}
                    alt=""
                  />
                )}
              </td>
              <td className="p-2 border flex gap-2">
                <button
                  onClick={() => handleEdit(sub)}
                  className="p-1 bg-yellow-500 text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(sub._id)}
                  className="p-1 bg-red-600 text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

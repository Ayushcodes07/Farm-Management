import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaExclamationTriangle,
  FaBoxOpen,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";

export default function InventoryTracker() {
  const [inventory, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [lowStockFilter, setLowStockFilter] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    quantity: "",
    unit: "kg",
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Track logged-in user and fetch inventory
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setInventory([]);
        setLoading(false);
        return;
      }

      setUser(currentUser);
      setLoading(true);

      const q = query(
        collection(db, "inventory"),
        where("uid", "==", currentUser.uid)
      );

      const unsubscribeSnap = onSnapshot(
        q,
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setInventory(data);
          setLoading(false);
        },
        (error) => {
          console.error(error);
          toast.error("Failed to load inventory data!");
          setLoading(false);
        }
      );

      return () => unsubscribeSnap();
    });

    return () => unsubscribeAuth();
  }, []);

  // ✅ Modal open/close
  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        itemName: item.itemName,
        quantity: item.quantity,
        unit: item.unit,
      });
    } else {
      setEditingId(null);
      setFormData({ itemName: "", quantity: "", unit: "kg" });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ itemName: "", quantity: "", unit: "kg" });
  };

  // ✅ Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  // ✅ Add or update inventory item
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.itemName || formData.quantity === "") {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      if (editingId) {
        await updateDoc(doc(db, "inventory", editingId), {
          ...formData,
          updatedAt: serverTimestamp(),
        });
        toast.success("Item updated successfully!");
      } else {
        await addDoc(collection(db, "inventory"), {
          ...formData,
          uid: user.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        toast.success("Item added successfully!");
      }
      handleCloseModal();
    } catch (error) {
      toast.error("Error saving item: " + error.message);
    }
  };

  // ✅ Delete item
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "inventory", id));
      toast.success("Item deleted successfully!");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete item!");
    }
  };

  const lowStockItems = inventory.filter((item) => item.quantity < 5);
  const displayInventory = lowStockFilter ? lowStockItems : inventory;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 p-6">
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
            Farm Inventory
          </h1>
          {user && (
            <p className="text-gray-600">
              Welcome, <span className="font-semibold">{user.email}</span>
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md transition-all"
          >
            <FaPlus /> Add Item
          </button>

          <button
            onClick={() => setLowStockFilter(!lowStockFilter)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold shadow-md transition-all ${
              lowStockFilter
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <FaExclamationTriangle /> Low Stock ({lowStockItems.length})
          </button>
        </div>

        {/* Inventory List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading your inventory...</p>
        ) : displayInventory.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-inner">
            <FaBoxOpen className="text-gray-400 mx-auto mb-3 text-4xl" />
            <p className="text-gray-500 text-lg">
              {lowStockFilter
                ? "No low stock items."
                : "No items yet. Add one to get started!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayInventory.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.25 }}
                className={`relative rounded-2xl p-5 backdrop-blur-md shadow-md border transition-all group ${
                  item.quantity < 5
                    ? "bg-red-50/80 border-red-400/50 hover:shadow-red-200"
                    : "bg-white/60 border-green-400/40 hover:shadow-green-200"
                }`}
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 tracking-tight">
                    {item.itemName}
                  </h3>
                  {item.quantity < 5 && (
                    <div className="flex items-center gap-1 text-red-500 text-xs font-medium">
                      <FaExclamationTriangle /> Low Stock
                    </div>
                  )}
                </div>

                {/* Quantity */}
                <div className="text-4xl font-extrabold text-green-600 flex items-end mb-4">
                  {item.quantity}
                  <span className="text-sm text-gray-500 ml-1 font-medium mb-1">
                    {item.unit}
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-3 border-t border-gray-200/70 mt-3 relative z-10">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleOpenModal(item)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500/90 hover:bg-blue-600 text-white px-3 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm"
                  >
                    <FaEdit /> Edit
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500/90 hover:bg-red-600 text-white px-3 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm"
                  >
                    <FaTrash /> Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingId ? "✏️ Update Item" : "➕ Add New Item"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <IoClose className="text-2xl" />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  placeholder="e.g., Tomato Seeds"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Unit
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none"
                >
                  <option value="kg">Kilogram (kg)</option>
                  <option value="g">Gram (g)</option>
                  <option value="liters">Liters (L)</option>
                  <option value="ml">Milliliters (ml)</option>
                  <option value="packets">Packets</option>
                  <option value="pieces">Pieces</option>
                  <option value="bags">Bags</option>
                  <option value="boxes">Boxes</option>
                </select>
              </div>

              <div className="flex gap-3 pt-5">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition"
                >
                  {editingId ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Calendar, Trash2, Plus, X, Loader, CheckCircle } from "lucide-react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function FarmDiary() {
  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    time: "",
    cropName: "",
    activity: "",
  });

  // ✅ Listen for user authentication
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchEntries(user.uid);
      } else {
        setEntries([]);
        setCurrentUser(null);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  // ✅ Fetch user-specific entries in real-time
  const fetchEntries = (uid) => {
    const q = query(collection(db, "farmDiary"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((entry) => entry.uid === uid);
      setEntries(data);
    });
    return unsubscribe;
  };

  // ✅ Add entry to Firestore with UID
  const handleAddEntry = async (e) => {
    e.preventDefault();
    if (
      !formData.date ||
      !formData.time ||
      !formData.cropName ||
      !formData.activity
    ) {
      alert("Please fill in all required fields!");
      return;
    }

    if (!currentUser) {
      alert("User not logged in!");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "farmDiary"), {
        ...formData,
        uid: currentUser.uid, // 🔹 store user id
        createdAt: serverTimestamp(),
      });

      setSuccessMessage("✓ Entry added successfully!");
      setLoading(false);
      setFormData({
        date: new Date().toISOString().split("T")[0],
        time: "",
        cropName: "",
        activity: "",
      });

      setTimeout(() => {
        setSuccessMessage("");
        setShowModal(false);
      }, 1500);
    } catch (error) {
      console.error("Error adding entry:", error);
      setLoading(false);
    }
  };

  // ✅ Delete entry
  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, "farmDiary", deleteId));
      setShowDeleteConfirm(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🌾</div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
              Farm Diary
            </h1>
            <p className="text-gray-600 text-lg">
              Track your farm activities and monitor crop progress
            </p>
          </div>

          {/* Add Entry Button */}
          {currentUser && (
            <div className="flex justify-center mb-12">
              <button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <Plus className="w-6 h-6" />
                Add New Entry
              </button>
            </div>
          )}

          {/* Entries */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
              <Calendar className="w-7 h-7 text-green-600" />
              Recent Entries{" "}
              <span className="text-gray-400">({entries.length})</span>
            </h2>

            {entries.length === 0 ? (
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                <div className="text-5xl mb-4">📝</div>
                <p className="text-gray-500 text-lg">
                  No entries yet. Start your farm diary today!
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:border-green-300 transition-all transform hover:-translate-y-1 overflow-hidden group"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-green-500" />
                            <p className="text-sm font-medium text-gray-500">
                              {new Date(entry.date).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "short",
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}{" "}
                              •{" "}
                              <span className="text-green-600 font-semibold">
                                {entry.time}
                              </span>
                            </p>
                          </div>
                          <h3 className="text-2xl font-bold text-green-700 mb-2">
                            {entry.cropName}
                          </h3>
                        </div>
                        <button
                          onClick={() => handleDeleteClick(entry.id)}
                          className="bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 p-2.5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200">
                        <p className="text-gray-700 leading-relaxed">
                          {entry.activity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Entry Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-200 px-6 py-6 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-green-700 mb-1">
                  Add New Entry
                </h2>
                <p className="text-gray-600 text-sm">
                  Record your farm activity details
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 transition p-2 hover:bg-gray-200 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {successMessage && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mx-6 mt-6 rounded flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-medium">
                  {successMessage}
                </span>
              </div>
            )}

            {/* Modal Content */}
            <form onSubmit={handleAddEntry} className="p-6 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Crop Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="cropName"
                  placeholder="e.g., Maize, Tomatoes, Rice..."
                  value={formData.cropName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Activity Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="activity"
                  placeholder="Describe your farm activity..."
                  value={formData.activity}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition resize-none"
                />
              </div>

              <div className="flex gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" /> Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" /> Add Entry
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm">
            <div className="text-center">
              <div className="text-5xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Delete Entry?
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this entry? This action cannot
                be undone.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-5 h-5" /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

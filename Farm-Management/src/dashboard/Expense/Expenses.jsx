import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Filter,
  IndianRupee,
  Tag,
  FileText,
} from "lucide-react";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Toaster, toast } from "react-hot-toast";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    category: "Seeds",
    amount: "",
    notes: "",
  });

  const auth = getAuth();

  const categories = [
    "Seeds",
    "Fertilizer",
    "Labor",
    "Equipment",
    "Water",
    "Pesticides",
    "Fuel",
    "Other",
  ];

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setExpenses([]);
        return;
      }

      const q = query(collection(db, "expenses"), orderBy("date", "desc"));
      const unsubscribeExpenses = onSnapshot(
        q,
        (snapshot) => {
          const data = snapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter((item) => item.uid === user.uid);
          setExpenses(data);
        },
        (error) => toast.error("Failed to load expenses: " + error.message)
      );

      // Clean up Firestore listener when auth state changes
      return () => unsubscribeExpenses();
    });

    // Cleanup auth listener
    return () => unsubscribeAuth();
  }, []);

  // Add or update expense
  const addExpense = async () => {
    if (!formData.amount || !formData.date) {
      toast.error("Please fill in all required fields");
      return;
    }
    const user = auth.currentUser;

    if (!user) {
      toast.error("You must be logged in to add expenses");
      return;
    }

    const expenseData = {
      uid: user.uid, // 🧠 store the UID
      date: formData.date,
      category: formData.category,
      amount: parseFloat(formData.amount),
      notes: formData.notes || "",
      createdAt: new Date(),
    };

    try {
      if (editingId) {
        const ref = doc(db, "expenses", editingId);
        await updateDoc(ref, expenseData);
        toast.success("Expense updated successfully");
        setEditingId(null);
      } else {
        await addDoc(collection(db, "expenses"), expenseData);
        toast.success("Expense added successfully");
      }
      resetForm();
    } catch (error) {
      toast.error("Error saving expense: " + error.message);
    }
  };

  const deleteExpense = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await deleteDoc(doc(db, "expenses", id));
        toast.success("Expense deleted successfully");
      } catch (error) {
        toast.error("Error deleting expense: " + error.message);
      }
    }
  };

  const editExpense = (expense) => {
    setFormData({
      date: expense.date,
      category: expense.category,
      amount: expense.amount.toString(),
      notes: expense.notes,
    });
    setEditingId(expense.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split("T")[0],
      category: "Seeds",
      amount: "",
      notes: "",
    });
    setShowForm(false);
    setEditingId(null);
  };

  // Filter month-wise
  const filteredExpenses = expenses.filter((e) =>
    e.date.startsWith(selectedMonth)
  );

  const totalAmount = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryStats = {};
  filteredExpenses.forEach((e) => {
    categoryStats[e.category] = (categoryStats[e.category] || 0) + e.amount;
  });

  // Format Indian currency
  const formatINR = (num) =>
    num.toLocaleString("en-IN", { style: "currency", currency: "INR" });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-4 w-full ">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto py-4">
        {/* Header */}
        <div className="mb-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg">
                <IndianRupee className="text-white" size={28} />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Farm Expense Tracker
              </h1>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowForm(!showForm);
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold"
            >
              <Plus size={18} />
              {showForm ? "Close Form" : "New Expense"}
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            Manage and track your farming expenses efficiently
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-4 mb-3">
          <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-emerald-500">
            <p className="text-gray-600 text-sm font-semibold mb-2">
              Total Expenses
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-600">
              {formatINR(totalAmount)}
            </p>
            <p className="text-gray-500 text-xs mt-2">
              {filteredExpenses.length} transactions
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm font-semibold mb-2">
              Average per Expense
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">
              {filteredExpenses.length > 0
                ? formatINR(totalAmount / filteredExpenses.length)
                : "₹0.00"}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-orange-500">
            <p className="text-gray-600 text-sm font-semibold mb-2">
              Categories
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-orange-600">
              {Object.keys(categoryStats).length}
            </p>
            <p className="text-gray-500 text-xs mt-2">types tracked</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          {showForm && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative animate-fadeIn">
                <button
                  onClick={resetForm}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>

                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  {editingId ? "✏️ Edit Expense" : "➕ Add Expense"}
                </h2>

                <div className="space-y-4">
                  {/* Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Calendar size={16} className="inline mr-2" />
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Tag size={16} className="inline mr-2" />
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <IndianRupee size={16} className="inline mr-2" />
                      Amount *
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                      step="0.01"
                      min="0"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FileText size={16} className="inline mr-2" />
                      Notes
                    </label>
                    <textarea
                      placeholder="Add any notes..."
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none h-24 resize-none"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={addExpense}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
                    >
                      {editingId ? "Update" : "Add"}
                    </button>
                    <button
                      onClick={resetForm}
                      className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Expense List */}
          <div className={showForm ? "lg:col-span-2" : "lg:col-span-3"}>
            <div className="bg-white rounded-2xl shadow-lg px-4 pt-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Expenses</h2>
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
                  <Filter size={18} className="text-gray-600" />
                  <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="bg-gray-100 outline-none font-semibold text-gray-700"
                  />
                </div>
              </div>

              {filteredExpenses.length === 0 ? (
                <div className="text-center py-12">
                  <IndianRupee
                    size={48}
                    className="mx-auto text-gray-300 mb-4"
                  />
                  <p className="text-gray-500 text-lg">
                    No expenses recorded for this month
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredExpenses.map((expense) => (
                    <div
                      key={expense.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md border border-gray-200 hover:border-emerald-300 transition-all"
                    >
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-semibold">
                            {expense.category}
                          </span>
                          <span className="text-gray-600 text-sm">
                            {expense.date}
                          </span>
                        </div>
                        {expense.notes && (
                          <p className="text-gray-600 text-sm">
                            {expense.notes}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-3 sm:mt-0">
                        <div className="text-right">
                          <p className="text-xl font-bold text-emerald-600">
                            {formatINR(expense.amount)}
                          </p>
                        </div>
                        <button
                          onClick={() => editExpense(expense)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => deleteExpense(expense.id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Category Breakdown */}
              {Object.keys(categoryStats).length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Breakdown by Category
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(categoryStats).map(([cat, amount]) => (
                      <div
                        key={cat}
                        className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-100"
                      >
                        <p className="text-gray-700 text-sm font-semibold mb-2">
                          {cat}
                        </p>
                        <p className="text-xl font-bold text-emerald-600">
                          {formatINR(amount)}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          {((amount / totalAmount) * 100).toFixed(0)}%
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

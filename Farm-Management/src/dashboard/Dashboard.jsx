import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FaBoxOpen, FaBook, FaRupeeSign } from "react-icons/fa";
import ChatbotWidget from "../Pages/ChatBot";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export default function Dashboard() {
  const [inventory, setInventory] = useState([]);
  const [farmDiary, setFarmDiary] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // Fetch collections
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setLoading(true);
      try {
        // Inventory
        const invSnap = await getDocs(
          query(collection(db, "inventory"), where("uid", "==", user.uid))
        );
        setInventory(invSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

        // Farm Diary
        const diarySnap = await getDocs(
          query(collection(db, "farmDiary"), where("uid", "==", user.uid))
        );
        setFarmDiary(diarySnap.docs.map((d) => ({ id: d.id, ...d.data() })));

        // Expenses
        const expSnap = await getDocs(
          query(collection(db, "expenses"), where("uid", "==", user.uid))
        );
        setExpenses(expSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Please login to view your dashboard.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-600">
        Loading data...
      </div>
    );
  }

  // Data for Recharts
  const expenseData = expenses.map((e) => ({
    name: e.category || "Unknown",
    amount: Number(e.amount) || 0,
  }));

  const inventoryData = inventory.map((i) => ({
    name: i.itemName || "Unnamed",
    stock: Number(i.quantity) || 0,
  }));

  const farmActivityCount = farmDiary.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl font-bold text-gray-800 mb-8"
      >
        🌾 Farm Management Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white shadow-xl rounded-2xl p-6 flex items-center gap-4"
        >
          <FaBoxOpen className="text-4xl text-indigo-500" />
          <div>
            <h2 className="text-xl font-semibold">Inventory Items</h2>
            <p className="text-gray-500">{inventory.length} total</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white shadow-xl rounded-2xl p-6 flex items-center gap-4"
        >
          <FaBook className="text-4xl text-green-500" />
          <div>
            <h2 className="text-xl font-semibold">Farm Diary</h2>
            <p className="text-gray-500">{farmActivityCount} entries</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white shadow-xl rounded-2xl p-6 flex items-center gap-4"
        >
          <FaRupeeSign className="text-4xl text-yellow-500" />
          <div>
            <h2 className="text-xl font-semibold">Expenses</h2>
            <p className="text-gray-500">
              ₹{expenseData.reduce((a, b) => a + b.amount, 0)}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inventory Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Inventory Stock Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inventoryData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="stock" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Expenses Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Expense Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseData}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {expenseData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}

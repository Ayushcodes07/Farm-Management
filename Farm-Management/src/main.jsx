import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import LoginPage from "./Features/Login.jsx";
import Layout from "./dashboard/layout.jsx";
import ExpenseTracker from "./dashboard/Expense/Expenses";
import FarmDiary from "./dashboard/Expense/FarmDairy.jsx";
import InventoryTracker from "./dashboard/Expense/Inventory.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import WeatherDashboard from "./dashboard/Weather.jsx";
import GeminiChatbot from "./Pages/ChatBot.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/dashboard" element={<Layout />}>
          <Route path="expenses" element={<ExpenseTracker />} />
          <Route path="inventory" element={<InventoryTracker />} />
          <Route path="diary" element={<FarmDiary />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="weather" element={<WeatherDashboard />} />
          <Route path="chatbot" element={<GeminiChatbot />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

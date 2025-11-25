import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LandingPage from "./Pages/LandingPage";
import FarmLanding from "./Pages/FramLanding";
import HeroSection from "./Pages/Collbrate";
import CropSolutions from "./Pages/CropSolutions";
import LandingFooter from "./Pages/LandingFooter";
import Footer from "./Pages/Footer";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // ✅ If logged in → go to dashboard
        navigate("dashboard/expenses");
      } else {
        // 🚫 If not logged in → stay on landing page
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <LandingPage />
      <FarmLanding />
      <HeroSection />
      <CropSolutions />
      <LandingFooter />
      <Footer />
    </div>
  );
}

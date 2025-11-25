import React, { useState } from "react";
import { Leaf, ArrowRight, ChartBar, Sprout, Bell, Mail } from "lucide-react";
import { signInWithGoogle } from "../firebase/firebase"; // ✅ correct import path
import { useNavigate } from "react-router";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const user = await signInWithGoogle();
      if (user) {
        alert(`Welcome, ${user.displayName}!`);
        navigate("/dashboard/expenses"); // ✅ redirect after login
      }
    } catch (error) {
      console.error(error);
      alert("Google sign-in failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden bg-slate-900">
      {/* Left Section - Image with Overlay */}
      <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-emerald-600 to-emerald-800">
        <img
          src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=1600&fit=crop"
          alt="Farm Management"
          className="w-full h-full object-cover opacity-90"
        />

        {/* Overlay Text Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md">
              <Leaf className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold">AgroTech</h2>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative p-6 md:p-10 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200">
        {/* Animated background orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative z-10 w-full max-w-md space-y-8">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-300 bg-clip-text text-transparent mb-3">
              Welcome Back
            </h1>
            <p className="text-slate-400 text-sm">
              Sign in to manage your farm with cutting-edge technology
            </p>
          </div>

          {/* Features Row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: <ChartBar className="w-5 h-5" />, label: "Analytics" },
              { icon: <Sprout className="w-5 h-5" />, label: "Growth" },
              { icon: <Bell className="w-5 h-5" />, label: "Alerts" },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-xl border border-emerald-500/20 rounded-lg p-3 text-center hover:border-emerald-400/50 transition-all duration-300 hover:bg-white/10"
              >
                <div className="flex justify-center text-emerald-400 mb-1">
                  {feature.icon}
                </div>
                <p className="text-xs text-slate-900 font-medium">
                  {feature.label}
                </p>
              </div>
            ))}
          </div>

          {/* Login Card */}
          <div className="bg-white/10 backdrop-blur-2xl border border-emerald-500/30 rounded-2xl p-8 shadow-xl hover:border-emerald-500/50 transition-all duration-300">
            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              disabled={isLoading}
              className="w-full relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-300" />

              <div className="relative bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 group-hover:scale-105">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⟳</span> Connecting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign in with Google
                    <ArrowRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isHovered ? "translate-x-1" : ""
                      }`}
                    />
                  </span>
                )}
              </div>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-slate-400 text-xs">
            By signing in, you agree to our{" "}
            <span className="text-emerald-400 hover:text-emerald-300 cursor-pointer transition-colors">
              Terms
            </span>{" "}
            and{" "}
            <span className="text-emerald-400 hover:text-emerald-300 cursor-pointer transition-colors">
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

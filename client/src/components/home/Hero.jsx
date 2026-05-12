import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
import { setCredentials } from "../../features/auth/authSlice";
import { Shield, Mail, Lock, ArrowRight } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminInfo } = useSelector((state) => state.auth);
  const [login, { isLoading, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (adminInfo) {
      navigate("admin/dashboard");
    }
  }, [adminInfo, navigate]);

  const submitHandler = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials(res.data));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-gray-100 flex items-center justify-center px-5">
      <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex bg-gradient-to-br from-emerald-600 to-emerald-800 text-white p-12 flex-col justify-between relative overflow-hidden">

          {/* Background decoration */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full" />
          <div className="absolute -bottom-20 -left-10 w-80 h-80 bg-white/5 rounded-full" />

          {/* Logo */}
          <div className="flex items-center gap-2 relative z-10">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Shield size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Empora</span>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-5xl font-bold leading-tight">
              Manage your <span className="text-emerald-300">team</span> with ease
            </h1>
            <p className="mt-5 text-emerald-100 text-base leading-relaxed">
              A clean, modern employee management system built for efficiency and clarity.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { label: "Employees", value: "2,400+" },
                { label: "Departments", value: "18" },
                { label: "Active Today", value: "94%" },
                { label: "Uptime", value: "99.9%" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 rounded-2xl px-4 py-3">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-emerald-200 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-emerald-300 text-xs relative z-10">© 2025 Empora. All rights reserved.</p>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12 flex items-center">
          <div className="w-full">

            {/* Mobile logo */}
            <div className="flex md:hidden items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                <Shield size={15} className="text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">Empora</span>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
              <p className="text-gray-400 mt-1.5 text-sm">Sign in to your admin account</p>
            </div>

            <form onSubmit={handleSubmit(submitHandler)} className="mt-8 space-y-5">

              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="admin@example.com"
                    id="email"
                    {...register("email", { required: "Email is required" })}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 transition-all"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <span className="text-xs text-emerald-600 cursor-pointer hover:underline">
                    Forgot password?
                  </span>
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    id="password"
                    {...register("password", { required: "Password is required" })}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 transition-all"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.password.message}</p>
                )}
              </div>

              {/* API Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <p className="text-red-600 text-sm">Invalid email or password. Please try again.</p>
                </div>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
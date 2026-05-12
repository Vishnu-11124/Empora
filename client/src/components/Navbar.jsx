import React from "react";
import { LogOut, User, Shield } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useLogoutMutation } from "../features/auth/authApi";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminInfo } = useSelector((state) => state.auth);
  const [logoutAdmin] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutAdmin().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="flex items-center justify-between px-8 py-3 bg-white border-b border-gray-200 shadow-sm">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
          <Shield size={16} className="text-white" />
        </div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">
          Empo<span className="text-emerald-600">ra</span>
        </span>
      </div>

      {/* Center Title */}
      <p className="text-sm font-medium text-gray-400 tracking-widest uppercase hidden md:block">
        User Management
      </p>

      {/* Profile */}
      <div>
        {adminInfo ? (
          <div className="flex items-center gap-3">

            {/* Admin Info */}
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-semibold text-gray-700 leading-tight">
                {adminInfo.name || "Admin"}
              </span>
              <span className="text-xs text-gray-400 leading-tight">
                {adminInfo.email}
              </span>
            </div>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm uppercase ring-2 ring-emerald-100">
              {adminInfo.email?.charAt(0)}
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-200" />

            {/* Logout Button */}
            <button
              onClick={logoutHandler}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-red-500 font-medium hover:bg-red-50 transition-colors duration-200"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Logout</span>
            </button>

          </div>
        ) : (
          <div className="w-9 h-9 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400">
            <User size={18} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
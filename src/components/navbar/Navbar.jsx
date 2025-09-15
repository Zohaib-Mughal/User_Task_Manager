// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ tab, setTab }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/auth", { replace: true });
  };

  return (
    <nav className="bg-gray-900 shadow-lg text-white py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl font-bold">Taskify</span>
        </div>

        <div className=" md:flex space-x-8">
          <button
            className={`hover:text-blue-500 ${
              tab === "home" ? "text-blue-300 border-b-1" : ""
            }`}
            onClick={() => {
              navigate("/", { replace: true });
              setTab("home");
            }}
          >
            Home
          </button>
          <button
            className={`hover:text-blue-500 ${
              tab === "user" ? "text-blue-300 border-b-1" : ""
            }`}
            onClick={() => {
              navigate("users", { replace: true });
              setTab("user");
            }}
          >
            User
          </button>
          <button
            className={`hover:text-blue-500 ${
              tab === "task" ? "text-blue-300 border-b-1" : ""
            }`}
            onClick={() => {
              navigate("tasks", { replace: true });
              setTab("task");
            }}
          >
            Tasks
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

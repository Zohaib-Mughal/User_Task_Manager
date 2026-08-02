import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { addUser, validateLogin, isLoggedIn } from "../utils/localStorageUtils";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleSignup = (data) => {
    const newUser = {
      username: data.username.trim().toLowerCase(),
      fullName: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      password: data.password.trim(),
    };

    const result = addUser(newUser);

    if (result === "usernameExist") {
      Swal.fire("Error", "Username already exists", "error");
    } else if (result === "emailExist") {
      Swal.fire("Error", "Email already exists", "error");
    } else if (result === "success") {
      Swal.fire("Success", "User registered successfully", "success").then(() => {
        setIsLogin(true);
        navigate("/", { replace: true });
        reset();
      });
    }
  };

  const handleLogin = (data) => {
    const key = data.key.trim();
    const password = data.pass.trim();

    const isValid = validateLogin(key, password);

    if (isValid) {
      localStorage.setItem("loggedInUser", JSON.stringify({ key, password }));
      navigate("/", { replace: true });
    } else {
      Swal.fire("Error", "Invalid Username/Email or Password", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 text-slate-100">
      <div className="w-full max-w-md bg-slate-900/70 border border-slate-800 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
        {/* Toggle Segmented Control */}
        <div className="flex bg-slate-950 p-1 rounded-xl mb-8 border border-slate-800/80">
          <button
            type="button"
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              isLogin
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
            onClick={() => {
              setIsLogin(true);
              reset();
            }}
          >
            Login
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              !isLogin
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
            onClick={() => {
              setIsLogin(false);
              reset();
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Signup Form */}
        {!isLogin && (
          <form onSubmit={handleSubmit(handleSignup)} className="space-y-4 m-0">
            <h2 className="text-2xl font-semibold text-white tracking-tight mb-4">
              Create an account
            </h2>

            <div>
              <input
                placeholder="Username"
                className="w-full m-0"
                {...register("username", {
                  required: "Username is required",
                  minLength: { value: 3, message: "Min 3 characters" },
                  maxLength: { value: 10, message: "Max 10 characters" },
                  pattern: {
                    value: /^[A-Za-z0-9]+$/,
                    message: "Only letters and numbers",
                  },
                })}
              />
              {errors.username && (
                <p className="text-red-400 text-xs mt-1 ml-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <input
                placeholder="Full Name"
                className="w-full m-0"
                {...register("fullName", {
                  required: "Full name is required",
                  pattern: {
                    value: /^[A-Za-z ]+$/,
                    message: "Only letters allowed",
                  },
                })}
              />
              {errors.fullName && (
                <p className="text-red-400 text-xs mt-1 ml-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full m-0"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@]+@[^@]+\.[^@]+$/,
                    message: "Invalid email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 ml-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password (8 characters)"
                className="w-full m-0"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Must be greater than 4 characters" },
                  maxLength: { value: 8, message: "Must be less than 8 characters" },
                })}
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-1 ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full m-0"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1 ml-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20 active:scale-[0.98] mt-2"
            >
              Sign Up
            </button>
          </form>
        )}

        {/* Login Form */}
        {isLogin && (
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 m-0">
            <h2 className="text-2xl font-semibold text-white tracking-tight mb-4">
              Welcome back
            </h2>

            <div>
              <input
                placeholder="Username or Email"
                className="w-full m-0"
                {...register("key", {
                  required: "Field is required",
                })}
              />
              {errors.key && (
                <p className="text-red-400 text-xs mt-1 ml-1">{errors.key.message}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full m-0"
                {...register("pass", {
                  required: "Password is required",
                  minLength: { value: 4, message: "Too short" },
                })}
              />
              {errors.pass && (
                <p className="text-red-400 text-xs mt-1 ml-1">{errors.pass.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20 active:scale-[0.98] mt-2"
            >
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Auth;
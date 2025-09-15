import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { addUser, validateLogin, isLoggedIn } from "../utils/localStorageUtils";
import { Navigate, useNavigate } from "react-router-dom";

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
      Swal.fire("Success", "User registered successfully", "success").then(
        () => {
          setIsLogin(true);
          navigate("/", { replace: true });
          reset();
        }
      );
    }
  };

  const handleLogin = (data) => {
    const key = data.key.trim();
    const password = data.pass.trim();

    const isValid = validateLogin(key, password);

    if (isValid) {
      localStorage.setItem("loggedInUser", JSON.stringify({ key, password }));
      navigate("/dashboard", { replace: true });
    } else {
      Swal.fire("Error", "Invalid Username/Email or Password", "error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <div className="w-full max-w-lg grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-gray-800 p-6 rounded-3xl shadow-lg col-span-2 m-10 ">
        <div className="col-span-2 flex justify-center mb-4">
          <button
            className={`px-6 py-2 mx-2 ${
              isLogin ? "border-blue-900 border-b-3 bg-gray-700" : ""
            }`}
            onClick={() => {
              setIsLogin(true);
              reset();
            }}
          >
            Login
          </button>
          <button
            className={`px-6 py-2 mx-2 ${
              !isLogin ? "border-blue-900 border-b-3 bg-gray-700" : ""
            }`}
            onClick={() => {
              setIsLogin(false);
              reset();
            }}
          >
            Signup
          </button>
        </div>

        {/* Signup Form */}
        {!isLogin && (
          <form
            onSubmit={handleSubmit(handleSignup)}
            className="bg-gray-800 p-6 rounded-md col-span-2 text-white"
          >
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

            <div>
              <input
                placeholder="Username"
                className="w-full p-2 mb-1 text-white rounded"
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
                <p className="text-red-400 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <input
                placeholder="Full Name"
                className="w-full p-2 mb-1 rounded"
                {...register("fullName", {
                  required: "Full name is required",
                  pattern: {
                    value: /^[A-Za-z ]+$/,
                    message: "Only letters allowed",
                  },
                })}
              />
              {errors.fullName && (
                <p className="text-red-400 text-sm">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 mb-1 rounded"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@]+@[^@]+\.[^@]+$/,
                    message: "Invalid email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 mb-1  rounded"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Must be 8 characters" },
                  maxLength: { value: 8, message: "Must be 8 characters" },
                })}
              />
              {errors.password && (
                <p className="text-red-400 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-2 mb-1 rounded"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button className="w-full bg-blue-500 hover:bg-blue-600 p-2 mt-4 rounded m-2">
              Sign Up
            </button>
          </form>
        )}

        {/* Login Form */}
        {isLogin && (
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="bg-gray-800 p-6 rounded col-span-2"
          >
            <h2 className="text-2xl font-bold mb-4">Login</h2>

            <div>
              <input
                placeholder="Username or Email"
                className="w-full p-2 mb-1 rounded"
                {...register("key", {
                  required: "Field is required",
                })}
              />
              {errors.key && (
                <p className="text-red-400 text-sm">{errors.key.message}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 mb-1 rounded"
                {...register("pass", {
                  required: "Password is required",
                  minLength: { value: 4, message: "Too short" },
                })}
              />
              {errors.pass && (
                <p className="text-red-400 text-sm">{errors.pass.message}</p>
              )}
            </div>

            <button className="w-full bg-green-500 m-2 hover:bg-green-600 p-2 mt-4 rounded">
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Auth;

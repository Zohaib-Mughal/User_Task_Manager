import { useForm } from "react-hook-form";

export default function UserForm({ submitFnc, initialData, isEditing }) {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditing
      ? initialData
      : {
          username: "",
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
  });
  const password = watch("password");
  return (
    <form onSubmit={handleSubmit(submitFnc)} className="space-y-1">
      {/* Username */}
      <div>
        <label htmlFor="username" className="text-white">
          Username
        </label>
        <input
          type="text"
          placeholder=""
          className="px-3 py-2 w-full border rounded bg-gray-900 text-white"
          {...register("username", {
            required: "Username required",
            minLength: {
              value: 4,
              message: "Username must be greater than 3 character",
            },
            maxLength: {
              value: 10,
              message: "Username must not exceed 10 character",
            },
            pattern: {
              value: /^[A-Za-z0-9]+$/,
              message: "Username can only contain letters and numbers",
            },
          })}
        />
        {errors.username && (
          <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
        )}
      </div>

      {/* Full Name */}
      <div>
        <label htmlFor="" className="text-white">
          Full Name
        </label>
        <input
          type="text"
          className="px-3 py-2 w-full border rounded bg-gray-900 text-white"
          {...register("fullName", {
            required: "Full name required",
            pattern: {
              value: /^[A-Za-z ]+$/,
              message: "Only alphabets allowed",
            },
          })}
        />
        {errors.fullName && (
          <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="" className="text-white">
          Email
        </label>
        <input
          type="text"
          className="px-3 py-2 w-full border rounded bg-gray-900 text-white"
          {...register("email", {
            required: "Email required",
            pattern: {
              value: /^[^@]+@[^@]+\.[^@]+$/,
              message: "Enter valid email",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="" className="text-white">
          Password
        </label>
        <input
          type="password"
          className="px-3 py-2 w-full border rounded bg-gray-900 text-white"
          {...register("password", {
            required: "Password required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="" className="text-white">
          Confirm Password
        </label>
        <input
          type="password"
          className="px-3 py-2 w-full border rounded bg-gray-900 text-white"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="bg-sky-700 text-white rounded px-3 py-2 w-full hover:bg-sky-800 m-2"
        >
          {isEditing ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
}

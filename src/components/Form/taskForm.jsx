import React from "react";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import {
  addTask,
  getAllUsers,
  stripHtmlTags,
  updateTask,
} from "../../utils/localStorageUtils";

export default function TaskForm({
  submitFnc,
  initialData,
  isEditing,
  description,
  setDescription,
}) {
  const [users, setUsers] = useState(getAllUsers);
  const quillRef = useRef(null);
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
          title: "",
          description: "",
          assignTo: "",
          completionDate: "",
          status: "in-progress",
        },
  });
  return (
    <div>
      <form onSubmit={handleSubmit(submitFnc)} className="space-y-4 text-white">
        <div id="titleAndStatus" className="flex justify-between">
          <div id="title" className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Title"
              className="px-3 py-2 w-55 border rounded text-white -mx-2 bg-gray-900"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be greater than 3 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Title cannot exceed 30 characters",
                },
              })}
            />

            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div id="status">
            <h1 className="mb-2">Status</h1>
            <select
              className="px-3 py-2 w-55 border rounded-lg text-white bg-gray-900"
              defaultValue={"in-progress"}
              {...register("status", {
                required: "Status is required",
              })}
            >
              <option value="in-progress">In Progress</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-xs mt-1">
                {errors.status.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <div className="">
            <h1>Completion Date</h1>
            <input
              type="date"
              onFocus={(e) => e.target.showPicker()}
              min={new Date().toISOString().split("T")[0]}
              max={
                new Date(new Date().setDate(new Date().getDate() + 28))
                  .toISOString()
                  .split("T")[0]
              }
              className="px-3 py-2 w-55 border rounded-lg text-white bg-gray-900 focus:outline-none"
              {...register("completionDate", {
                required: "Completion date is required",
                validate: (value) => {
                  const selected = new Date(value);
                  const today = new Date();
                  const maxDate = new Date();

                  today.setHours(0, 0, 0, 0);
                  maxDate.setHours(0, 0, 0, 0);

                  maxDate.setDate(today.getDate() + 28);

                  if (selected < today) return "Date cannot be in the past";
                  if (selected > maxDate + 1)
                    return "Date cannot be more than 4 weeks in future";
                  return true;
                },
              })}
            />

            {errors.completionDate && (
              <p className="text-red-500 text-xs mt-1">
                {errors.completionDate.message}
              </p>
            )}
          </div>
          <div>
            <h1 className="mb-2">Assign To</h1>
            <select
              className="px-3 py-2 w-55 border rounded-lg text-white bg-gray-900"
              {...register("assignTo", {
                required: "Please assign task to someone",
              })}
            >
              <option value="">Select User</option>
              {users.length > 0 ? (
                users.map((user) => (
                  <option key={user.username} value={user.username}>
                    {user.username}
                  </option>
                ))
              ) : (
                <option disabled>No users found</option>
              )}
            </select>

            {errors.assignTo && (
              <p className="text-red-500 text-xs mt-1">
                {errors.assignTo.message}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="border h-40 overflow-y-auto bg-white rounded w-full">
          <ReactQuill
            className="text-black"
            ref={quillRef}
            theme="snow"
            value={description}
            onChange={setDescription}
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-sky-700 text-white rounded px-3 py-2 w-full hover:bg-sky-800"
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}

import React, { useState, useEffect, useRef, Fragment } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "react-quill/dist/quill.snow.css";
import {
  addTask,
  getAllUsers,
  stripHtmlTags,
  updateTask,
} from "../../utils/localStorageUtils";
import "../../style/style.css";
import TaskForm from "../Form/taskForm";
import ModalCommon from "../modal/modalCommon";

function TaskManagement({
  isOpen,
  onClose,
  initialData,
  onTaskAdded,
  taskMode,
}) {
  const [description, setDescription] = useState(
    initialData?.description ? stripHtmlTags(initialData.description) : ""
  );

  const title = taskMode === "add" ? "Add" : "Edit";
  const [users, setUsers] = useState([]);
  const quillRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      title: "",
      status: "in-progress",
      assignTo: "",
      completionDate: "",
      description: "",
    },
  });

  const onTaskFormSubmit = (data) => {
    const cleanedDescription = stripHtmlTags(description).trim();

    if (!cleanedDescription) {
      Swal.fire({
        title: "Validation Error",
        text: "Description is required",
        icon: "error",
        confirmButtonColor: "#d33",
      });
      return;
    }

    const task = {
      title: data.title,
      description: description,
      status: data.status,
      assignTo: data.assignTo,
      completionDate: data.completionDate,
    };

    if (taskMode !== "add") {
      const taskUpdated = updateTask(task);

      if (taskUpdated === "success") {
        Swal.fire({
          title: "User updated successfully",
          text: "User data has been updated",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
          timerProgressBar: true,
        }).then(() => {
          reset();
          onClose();
          onTaskAdded(taskUpdated);
        });
      } else {
        Swal.fire({
          title: "Failed",
          text: "Retry.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "Try Again",
        });
      }
      return;
    }

    const taskAdded = addTask(task);

    if (taskAdded === "success") {
      Swal.fire({
        title: initialData
          ? "Task updated successfully"
          : "Task added successfully",
        text: "Redirecting to all tasks",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        reset();
        onClose();
        if (typeof onTaskAdded === "function") onTaskAdded();
      });
    } else if (taskAdded === "exist") {
      Swal.fire({
        title: "Failed",
        text: "Task with the same title already exists.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  useEffect(() => {
    const allUsers = getAllUsers();
    console.log("Initial data", initialData);
    setUsers(allUsers);
  }, []);
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <ModalCommon isOpen={isOpen} onClose={onClose} title={`${title} Task`}>
      <TaskForm
        submitFnc={onTaskFormSubmit}
        initialData={initialData}
        isEditing={taskMode === "add" ? false : true}
        setDescription={setDescription}
        description={description}
      />
    </ModalCommon>
  );
}

export default TaskManagement;

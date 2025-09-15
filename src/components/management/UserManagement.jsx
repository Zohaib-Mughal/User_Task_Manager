import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { addUser, updateUser } from "../../utils/localStorageUtils";
import Swal from "sweetalert2";
import ModalCommon from "../modal/modalCommon";
import UserForm from "../Form/userForm";

function UserManagement({ isOpen, onClose, initialData, onUserAdded, mode }) {
  if (initialData) initialData.confirmPassword = initialData.password;

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      username: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onUserFormSubmit = (data) => {
    const user = {
      username: data.username.trim().toLowerCase(),
      fullName: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      password: data.password.trim(),
    };
    if (mode != "add") {
      const userUpdated = updateUser(
        user,
        initialData.username,
        initialData.email
      );

      if (userUpdated === "success") {
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
        });
      } else if (userUpdated === "emailExist") {
        Swal.fire({
          title: "Email already exists",
          text: "Please use a different email address",
          icon: "warning",
          confirmButtonColor: "#f59e0b",
        });
      } else if (userUpdated === "usernameExist") {
        Swal.fire({
          title: "Username already exists",
          text: "Please choose a different username",
          icon: "warning",
          confirmButtonColor: "#f59e0b",
        });
      } else {
        Swal.fire({
          title: "Failed",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "Try Again",
        });
      }
    } else {
      const userAdded = addUser(user);

      if (userAdded === "success") {
        Swal.fire({
          title: "User added successfully",
          text: "New user has been added",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
          timerProgressBar: true,
        }).then(() => {
          reset();
          onClose();
          onUserAdded(userAdded);
        });
      }
      if (userAdded === "usernameExist") {
        Swal.fire("Error", "Username already exists", "error");
      } else if (userAdded === "emailExist") {
        Swal.fire("Error", "Email already exists", "error");
      }
    }
  };

  const title = mode.toUpperCase();

  return (
    <ModalCommon isOpen={isOpen} onClose={onClose} title={`${title} User`}>
      <UserForm
        submitFnc={onUserFormSubmit}
        initialData={initialData}
        isEditing={mode === "add" ? false : true}
      />
    </ModalCommon>
  );
}

export default UserManagement;

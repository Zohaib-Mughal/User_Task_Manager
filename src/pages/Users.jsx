import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllUsers,
  deleteUser,
  checkUser,
  isLoggedIn,
} from "../utils/localStorageUtils";
import UserManagement from "../components/management/UserManagement";
import Swal from "sweetalert2";
import TableCommon from "../components/Table/tableCommon";

export default function Users() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([getAllUsers()]);
  const [mode, setMode] = useState([]);
  const [, forceUpdate] = useState({});

  const openDialog = (user) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedUser(null);
    setIsDialogOpen(false);
    forceUpdate({});
  };

  useEffect(() => {
    const savedUsers = getAllUsers();
    setUsers(savedUsers);
  }, [isDialogOpen]);
  const handleAddUser = (newUser) => {
    setUsers((prev) => [newUser, ...prev]);
  };

  const handleDelete = async (username, email) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      const updatedUsers = deleteUser(username, email);
      setUsers(updatedUsers);

      await Swal.fire({
        title: "Deleted Successfully",
        text: "Redirecting to all users...",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      if (checkUser(username, email)) {
        localStorage.removeItem("loggedInUser");
        navigate("/", { replace: true });
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-50">All User</h1>
        <button
          onClick={() => {
            setMode("add");
            openDialog();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600"
        >
          Add User
        </button>
      </div>

      <TableCommon
        tableData={users}
        const
        column={[
          { field: "username", header: "Username" },
          { field: "fullName", header: "Full Name" },
          { field: "email", header: "Email" },
        ]}
        action={[
          {
            header: "Delete",
            function: (user) => handleDelete(user.username, user.email),
            style: "bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded",
          },
          {
            header: "Edit",
            function: (user) => {
              setSelectedUser(user);
              setIsDialogOpen(true);
              setMode("edit");
            },
            style:
              "bg-blue-500 m-2 hover:bg-blue-600 text-white px-3 py-1 rounded",
          },
        ]}
      />

      {isDialogOpen && (
        <UserManagement
          isOpen={isDialogOpen}
          onClose={closeDialog}
          initialData={selectedUser}
          onUserAdded={handleAddUser}
          mode={mode}
        />
      )}
    </div>
  );
}

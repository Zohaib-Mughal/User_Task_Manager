import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllUsers,
  deleteUser,
  checkUser,
} from "../utils/localStorageUtils";
import UserManagement from "../components/management/UserManagement";
import Swal from "sweetalert2";
import TableCommon from "../components/Table/tableCommon";

export default function Users() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [mode, setMode] = useState("");

  const openDialog = (user) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedUser(null);
    setIsDialogOpen(false);
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
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#475569",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      background: "#0f172a",
      color: "#f8fafc",
    });

    if (result.isConfirmed) {
      const updatedUsers = deleteUser(username, email);
      setUsers(updatedUsers);

      await Swal.fire({
        title: "Deleted Successfully",
        text: "User has been removed.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        background: "#0f172a",
        color: "#f8fafc",
      });

      if (checkUser(username, email)) {
        localStorage.removeItem("loggedInUser");
        navigate("/", { replace: true });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">All Users</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage user accounts and permissions
          </p>
        </div>
        <button
          onClick={() => {
            setMode("add");
            openDialog();
          }}
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-xl transition-all duration-200 shadow-md shadow-blue-600/20 active:scale-95 text-sm"
        >
          + Add User
        </button>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl p-4">
        <TableCommon
          tableData={users}
          column={[
            { field: "username", header: "Username" },
            { field: "fullName", header: "Full Name" },
            { field: "email", header: "Email" },
          ]}
          action={[
            {
              header: "Edit",
              function: (user) => {
                setSelectedUser(user);
                setIsDialogOpen(true);
                setMode("edit");
              },
              style:
                "bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium transition-all mr-2",
            },
            {
              header: "Delete",
              function: (user) => handleDelete(user.username, user.email),
              style:
                "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
            },
          ]}
        />
      </div>

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
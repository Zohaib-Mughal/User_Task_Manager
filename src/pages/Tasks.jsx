import React, { useState, useEffect } from "react";
import { deleteTask, getAllTasks } from "../utils/localStorageUtils";
import TaskManagement from "../components/management/TaskMangement";
import Swal from "sweetalert2";
import TableCommon from "../components/Table/tableCommon";

export default function Tasks() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskMode, setTaskMode] = useState("");

  useEffect(() => {
    setTasks(getAllTasks());
  }, []);

  const openDialog = (task) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedTask(null);
    setIsDialogOpen(false);
  };

  const handleTaskAddedOrUpdated = () => {
    setTasks(getAllTasks());
  };

  const handleDelete = (title) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#475569",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      background: "#0f172a",
      color: "#f8fafc",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted Successfully",
          text: "Task has been removed.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          background: "#0f172a",
          color: "#f8fafc",
        });
        const updatedTasks = deleteTask(title);
        setTasks(updatedTasks);
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Tasks</h1>
          <p className="text-xs text-slate-400 mt-1">
            Organize and manage your team's assignments
          </p>
        </div>
        <button
          onClick={() => {
            setTaskMode("add");
            openDialog();
          }}
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-xl transition-all duration-200 shadow-md shadow-blue-600/20 active:scale-95 text-sm"
        >
          + Add Task
        </button>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl p-4">
        <TableCommon
          tableData={tasks}
          column={[
            { field: "title", header: "Title" },
            { field: "description", header: "Description" },
            { field: "status", header: "Status" },
            { field: "assignTo", header: "Assign To" },
            { field: "completionDate", header: "Completion Date" },
          ]}
          action={[
            {
              header: "Edit",
              function: (data) => {
                setTaskMode("edit");
                setIsDialogOpen(true);
                setSelectedTask(data);
              },
              style:
                "bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium transition-all mr-2",
            },
            {
              header: "Delete",
              function: (data) => handleDelete(data.title),
              style:
                "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
            },
          ]}
        />
      </div>

      {isDialogOpen && (
        <TaskManagement
          isOpen={isDialogOpen}
          onClose={closeDialog}
          initialData={selectedTask}
          onTaskAdded={handleTaskAddedOrUpdated}
          taskMode={taskMode}
        />
      )}
    </div>
  );
}
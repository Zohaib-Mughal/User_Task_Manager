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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Delete success",
          text: "Redirecting to all tasks",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true,
        });
        const updatedTasks = deleteTask(title);
        setTasks(updatedTasks);
      }
    });
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-50">Tasks</h1>
        <button
          onClick={() => {
            setTaskMode("add");
            openDialog();
          }}
          className="bg-blue-500 text-white py-2 px-4 rounded-2xl hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      <TableCommon
        tableData={tasks}
        const
        column={[
          { field: "title", header: "Title" },
          { field: "description", header: "Description" },
          { field: "status", header: "Status" },
          { field: "assignTo", header: "Assign to" },
          { field: "completionDate", header: "Completion Date" },
        ]}
        action={[
          {
            header: "Delete",
            function: (data) => handleDelete(data.title),
            style: "bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded",
          },
          {
            header: "Edit",
            function: (data) => {
              setTaskMode("edit");
              setIsDialogOpen(true);
              setSelectedTask(data);
            },
            style:
              "bg-blue-500 m-2 hover:bg-blue-600 text-white px-3 py-1 rounded",
          },
        ]}
      />

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

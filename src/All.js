import React, { useState, useEffect } from "react";
import "./All.css";
import Tasks from "./Tasks";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Adddition from "./Adddition";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

export default function All() {
  const [tasks, setTasks] = useState(() => {
  const stored = localStorage.getItem("tasks");
  return stored ? JSON.parse(stored) : [];
});

  const [showForm, setShowForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [filter, setFilter] = useState("all");

  // ✅ تحميل المهام من localStorage
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      console.log("Loaded tasks from localStorage:", stored);
      setTasks(JSON.parse(stored));
    }
  }, []);

  // ✅ حفظ المهام عند أي تعديل
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (task) => {
    if (editingTaskId !== null) {
      const updated = tasks.map((t) =>
        t.id === editingTaskId ? { ...t, ...task } : t
      );
      setTasks(updated);
    } else {
      const newTask = {
        ...task,
        id: Date.now(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }

    setShowForm(false);
    setEditingTaskId(null);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (id) => {
    setEditingTaskId(id);
    setShowForm(true);
  };

  const handleComplete = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: true } : task
    );
    setTasks(updated);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "notCompleted") return !task.completed;
    return true;
  });

  return (
    <>
      {showAlert && (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          sx={{
            position: "fixed",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10000,
            width: "300px",
            textAlign: "center",
          }}
        >
          Task saved successfully!
        </Alert>
      )}

      <div className="card" style={{ margin: "90px 340px", width: "500px" }}>
        <div className="logo">
        <span className="white-text">To </span><span className="purple-text">  Do  List</span></div>
        <hr />

        <Stack direction="row" spacing={1}>
          <Chip
            label="Not Completed"
            onClick={() => setFilter("notCompleted")}
            clickable
          />
          <Chip
            label="Completed"
            variant="outlined"
            onClick={() => setFilter("completed")}
            clickable
          />
          <Chip
            label="All"
            variant="outlined"
            onClick={() => setFilter("all")}
            clickable
          />
        </Stack>

        {filteredTasks.map((task) => (
          <Tasks
            key={task.id}
            id={task.id}
            title={task.title}
            details={task.details}
            onDelete={handleDelete}
            onEdit={task.completed ? () => {} : handleEdit}
            onComplete={task.completed ? () => {} : handleComplete}
            isCompleted={task.completed}
          />
        ))}

        <div style={{ marginTop: "30px" }}>
          {showForm && (
            <Adddition
              onClose={() => setShowForm(false)}
              onAddTask={handleAddTask}
              taskToEdit={
                editingTaskId !== null
                  ? tasks.find((t) => t.id === editingTaskId)
                  : null
              }
            />
          )}

          <Chip
            label="Add Task"
            variant="outlined"
            clickable
            onClick={() => {
              setEditingTaskId(null);
              setShowForm(true);
            }}
          />
        </div>
      </div>
    </>
  );
}

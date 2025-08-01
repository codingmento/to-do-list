import React, { useState, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";

export default function Adddition({ onClose, onAddTask, taskToEdit }) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDetails(taskToEdit.details);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !details.trim()) return;

    onAddTask({ title, details });
    setTitle("");
    setDetails("");
    onClose();
  };

  return (
    <Card
      sx={{ width: 500, p: 2, zIndex: 9999 }}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        borderRadius: '10px',
      }}
    >
      <CardContent>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Tooltip title="Close">
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </div>

        <Typography variant="h5" gutterBottom>
          {taskToEdit ? "Edit Task" : "Create a new task"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Details"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            {taskToEdit ? "Save Changes" : "Create the task"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

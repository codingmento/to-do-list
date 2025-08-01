import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';
import TaskAltSharpIcon from '@mui/icons-material/TaskAltSharp';
import Card from '@mui/material/Card';

export default function Tasks({ title, details, id, onDelete, onEdit, onComplete, isCompleted }) {
  return (
    <Card sx={{ minWidth: 275, margin: '20px 0px', background: isCompleted ? '#f7dd86ff' : 'rgba(170, 96, 239, 1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <div style={{ display: 'flex', gap: '8px' }}>
          <Tooltip title="Delete">
            <IconButton onClick={() => onDelete(id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton onClick={() => onEdit(id)} disabled={isCompleted}>
              <ModeEditSharpIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Mark as Completed">
            <IconButton onClick={() => onComplete(id)} disabled={isCompleted}>
              <TaskAltSharpIcon />
            </IconButton>
          </Tooltip>
          <div style={{ marginLeft: '190px' }}>
            <h3>{title}</h3>
            <hr />
            <h6>{details}</h6>
          </div>
        </div>
      </div>
    </Card>
  );
}

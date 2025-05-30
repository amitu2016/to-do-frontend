import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Typography,
  Checkbox,
  Paper,
  Grow,
} from '@mui/material';
import { Delete as DeleteIcon, Close as CloseIcon, Add as AddIcon } from '@mui/icons-material';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface StickyNoteProps {
  id: number;
  title: string;
  todos: Todo[];
  onDelete: (id: number) => void;
  onAddTodo: (noteId: number, title: string) => void;
  onToggleTodo: (noteId: number, todoId: number, completed: boolean) => void;
  onDeleteTodo: (noteId: number, todoId: number) => void;
}

const StickyNote: React.FC<StickyNoteProps> = ({
  id,
  title,
  todos,
  onDelete,
  onAddTodo,
  onToggleTodo,
  onDeleteTodo,
}) => {
  const [newTodo, setNewTodo] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    onAddTodo(id, newTodo);
    setNewTodo('');
  };

  const getRandomColor = () => {
    const colors = [
      '#fff8dc',  // Cornsilk
      '#f0fff0',  // Honeydew
      '#fff0f5',  // LavenderBlush
      '#f0f8ff',  // AliceBlue
      '#f5f5dc',  // Beige
      '#fffaf0',  // FloralWhite
    ];
    return colors[id % colors.length];
  };

  const getRandomRotation = () => {
    return `rotate(${(id % 5 - 2)}deg)`;
  };

  return (
    <Grow in={true}>
      <Paper
        elevation={isHovered ? 8 : 3}
        sx={{
          p: 2,
          minHeight: 200,
          backgroundColor: getRandomColor(),
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          transform: getRandomRotation(),
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02) rotate(0deg)',
          },
          borderRadius: '2px',
          boxShadow: isHovered 
            ? '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
            : '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <IconButton
          size="small"
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.2s',
            backgroundColor: 'rgba(0,0,0,0.05)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.1)',
            },
          }}
          onClick={() => onDelete(id)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2, 
            pr: 4,
            fontFamily: "'Permanent Marker', cursive",
            color: 'rgba(0,0,0,0.7)',
          }}
        >
          {title}
        </Typography>

        <Box component="form" onSubmit={handleAddTodo} sx={{ mb: 2 }}>
          <TextField
            size="small"
            fullWidth
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            variant="standard"
            InputProps={{
              endAdornment: (
                <IconButton 
                  size="small" 
                  type="submit"
                  sx={{ 
                    opacity: newTodo.trim() ? 1 : 0,
                    transition: 'opacity 0.2s',
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              ),
            }}
            sx={{
              '& .MuiInput-underline:before': {
                borderBottomColor: 'rgba(0,0,0,0.1)',
              },
              '& .MuiInput-underline:hover:before': {
                borderBottomColor: 'rgba(0,0,0,0.2)',
              },
            }}
          />
        </Box>

        <List sx={{ flex: 1, overflow: 'auto' }}>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              dense
              sx={{
                borderRadius: 1,
                mb: 0.5,
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.02)',
                },
              }}
            >
              <Checkbox
                checked={todo.completed}
                onChange={() => onToggleTodo(id, todo.id, todo.completed)}
                size="small"
                sx={{
                  color: 'rgba(0,0,0,0.3)',
                  '&.Mui-checked': {
                    color: 'rgba(0,0,0,0.5)',
                  },
                }}
              />
              <ListItemText
                primary={todo.title}
                sx={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  opacity: todo.completed ? 0.5 : 1,
                  transition: 'all 0.2s',
                }}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDeleteTodo(id, todo.id)}
                  size="small"
                  sx={{
                    opacity: isHovered ? 0.5 : 0,
                    '&:hover': {
                      opacity: 1,
                    },
                    transition: 'opacity 0.2s',
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Grow>
  );
};

export default StickyNote; 
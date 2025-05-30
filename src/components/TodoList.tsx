import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
  Container,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Fab,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import axios from '../api/config';
import StickyNote from './StickyNote';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface StickyNote {
  id: number;
  title: string;
  todos: Todo[];
  userId: string;
}

interface TodoListProps {
  onLogout: () => void;
  user: {
    id: string;
    username: string;
  };
}

const TodoList: React.FC<TodoListProps> = ({ onLogout, user }) => {
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    handleClose();
  };

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`/api/notes/user/${user.id}`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setNotes([]);
    }
  };

  const handleAddNote = async () => {
    if (!newNoteTitle.trim()) return;

    try {
      const response = await axios.post(`/api/notes`, {
        title: newNoteTitle,
        todos: [],
        userId: user.id
      });
      setNotes([...notes, response.data]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
    setNewNoteTitle('');
    setIsDialogOpen(false);
  };

  const handleDeleteNote = async (noteId: number) => {
    try {
      await axios.delete(`/api/notes/${noteId}`);
      setNotes(notes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleAddTodo = async (noteId: number, title: string) => {
    try {
      const response = await axios.post(`/api/notes/${noteId}/todos`, {
        title,
        completed: false,
      });
      setNotes(
        notes.map((note) =>
          note.id === noteId
            ? { ...note, todos: [...note.todos, response.data] }
            : note
        )
      );
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleToggleTodo = async (
    noteId: number,
    todoId: number,
    completed: boolean
  ) => {
    try {
      await axios.put(`/api/notes/${noteId}/todos/${todoId}`, {
        completed: !completed,
      });
      setNotes(
        notes.map((note) =>
          note.id === noteId
            ? {
                ...note,
                todos: note.todos.map((todo) =>
                  todo.id === todoId
                    ? { ...todo, completed: !todo.completed }
                    : todo
                ),
              }
            : note
        )
      );
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleDeleteTodo = async (noteId: number, todoId: number) => {
    try {
      await axios.delete(`/api/notes/${noteId}/todos/${todoId}`);
      setNotes(
        notes.map((note) =>
          note.id === noteId
            ? {
                ...note,
                todos: note.todos.filter((todo) => todo.id !== todoId),
              }
            : note
        )
      );
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <Box sx={{ 
      flexGrow: 1,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <AppBar position="fixed" color="default" elevation={1}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "'Permanent Marker', cursive",
              color: 'primary.main',
            }}
          >
            Welcome, {user.username}'s Sticky Notes
          </Typography>

          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setIsDialogOpen(true)}
            sx={{
              mr: 3,
              borderRadius: '20px',
              px: 2,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              borderWidth: '2px',
              '&:hover': {
                borderWidth: '2px',
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
              },
            }}
          >
            Add Note
          </Button>

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <AccountCircleIcon />
            </Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* Spacer for fixed AppBar */}

      <Container 
        maxWidth="lg" 
        sx={{ 
          mt: 4, 
          mb: 4,
          flex: '1 0 auto', // This will make the container take available space
          paddingBottom: '80px' // Space for footer
        }}
      >
        <Grid container spacing={3}>
          {notes.map((note) => (
            <Grid item xs={12} sm={6} md={4} key={note.id}>
              <StickyNote
                id={note.id}
                title={note.title}
                todos={note.todos}
                onDelete={handleDeleteNote}
                onAddTodo={handleAddTodo}
                onToggleTodo={handleToggleTodo}
                onDeleteTodo={handleDeleteTodo}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          textAlign: 'center',
          borderTop: 1,
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontFamily: "'Permanent Marker', cursive",
            fontSize: '0.9rem'
          }}
        >
          © {new Date().getFullYear()} Amit Upadhyay. All Rights Reserved.
        </Typography>
      </Box>

      <Dialog 
        open={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
        fullScreen={isMobile}
      >
        <DialogTitle>Create New Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Note Title"
            fullWidth
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddNote} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TodoList; 
package com.example.todoapp.service;

import com.example.todoapp.model.Note;
import com.example.todoapp.model.User;
import com.example.todoapp.repository.NoteRepository;
import com.example.todoapp.repository.UserRepository;
import com.example.todoapp.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {
    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Note> getNotesByUserId(String userId) {
        return noteRepository.findByUserId(userId);
    }

    public Note createNote(Note note, String userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        note.setUser(user);
        return noteRepository.save(note);
    }

    public Note updateNote(Long noteId, Note noteDetails, String userId) {
        Note note = noteRepository.findById(noteId)
            .orElseThrow(() -> new ResourceNotFoundException("Note not found"));

        if (!note.getUser().getId().equals(userId)) {
            throw new AccessDeniedException("You don't have permission to update this note");
        }

        note.setTitle(noteDetails.getTitle());
        return noteRepository.save(note);
    }

    public void deleteNote(Long noteId, String userId) {
        Note note = noteRepository.findById(noteId)
            .orElseThrow(() -> new ResourceNotFoundException("Note not found"));

        if (!note.getUser().getId().equals(userId)) {
            throw new AccessDeniedException("You don't have permission to delete this note");
        }

        noteRepository.delete(note);
    }

    public Note getNoteById(Long noteId, String userId) {
        Note note = noteRepository.findById(noteId)
            .orElseThrow(() -> new ResourceNotFoundException("Note not found"));

        if (!note.getUser().getId().equals(userId)) {
            throw new AccessDeniedException("You don't have permission to view this note");
        }

        return note;
    }
} 
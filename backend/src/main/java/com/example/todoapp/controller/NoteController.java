package com.example.todoapp.controller;

import com.example.todoapp.model.Note;
import com.example.todoapp.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {
    @Autowired
    private NoteService noteService;

    @GetMapping("/user/{userId}")
    public List<Note> getNotesByUser(@PathVariable String userId, Authentication authentication) {
        validateUser(userId, authentication);
        return noteService.getNotesByUserId(userId);
    }

    @PostMapping
    public Note createNote(@RequestBody Note note, Authentication authentication) {
        String userId = getUserIdFromAuthentication(authentication);
        return noteService.createNote(note, userId);
    }

    @PutMapping("/{id}")
    public Note updateNote(@PathVariable Long id, @RequestBody Note noteDetails, Authentication authentication) {
        String userId = getUserIdFromAuthentication(authentication);
        return noteService.updateNote(id, noteDetails, userId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable Long id, Authentication authentication) {
        String userId = getUserIdFromAuthentication(authentication);
        noteService.deleteNote(id, userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public Note getNoteById(@PathVariable Long id, Authentication authentication) {
        String userId = getUserIdFromAuthentication(authentication);
        return noteService.getNoteById(id, userId);
    }

    private void validateUser(String userId, Authentication authentication) {
        String authenticatedUserId = getUserIdFromAuthentication(authentication);
        if (!userId.equals(authenticatedUserId)) {
            throw new SecurityException("You don't have permission to access these notes");
        }
    }

    private String getUserIdFromAuthentication(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("User not authenticated");
        }
        return authentication.getName(); // Assuming the user ID is stored in the principal name
    }
} 
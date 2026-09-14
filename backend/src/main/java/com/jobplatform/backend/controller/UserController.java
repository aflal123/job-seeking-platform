package com.jobplatform.backend.controller;

import com.jobplatform.backend.model.User;
import com.jobplatform.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserProfile(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found!");
        }
        return ResponseEntity.ok(user.get());
    }

    @PutMapping("/{id}/profile")
    public ResponseEntity<?> updateProfile(@PathVariable Long id, @RequestBody Map<String, String> request) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found!");
        }

        User user = userOptional.get();
        if (request.containsKey("fullName")) {
            user.setFullName(request.get("fullName"));
        }
        // In a real app, we would save the resume file to S3 and save the URL here.
        // For now, we simulate saving the skills string or resume link.
        userRepository.save(user);

        return ResponseEntity.ok(user);
    }
}

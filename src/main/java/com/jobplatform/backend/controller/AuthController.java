package com.jobplatform.backend.controller;

import com.jobplatform.backend.model.User;
import com.jobplatform.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        // Check if email already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest()
                    .body("Email already exists!");
        }

        // Hash the password before saving!
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save user to database
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }
}
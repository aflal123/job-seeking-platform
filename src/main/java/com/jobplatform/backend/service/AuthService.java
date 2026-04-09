package com.jobplatform.backend.service;

import com.jobplatform.backend.config.JwtUtil;
import com.jobplatform.backend.dto.AuthResponse;
import com.jobplatform.backend.dto.LoginRequest;
import com.jobplatform.backend.dto.RegisterRequest;
import com.jobplatform.backend.model.User;
import com.jobplatform.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public User register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setPhone(request.getPhone());
        user.setLocation(request.getLocation());

        return userRepository.save(user);
    }

    public AuthResponse login(LoginRequest request) {

        // Step 1 — find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // Step 2 — check password matches
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // Step 3 — generate JWT token
        String token = jwtUtil.generateToken(user.getId(), user.getRole());

        // Step 4 — return token + role + name to frontend
        return new AuthResponse(token, user.getRole(), user.getName(), user.getId());
    }
}
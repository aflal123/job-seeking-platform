package com.jobplatform.backend.controller;

import com.jobplatform.backend.JwtUtil;
import com.jobplatform.backend.model.User;
import com.jobplatform.backend.repository.UserRepository;
import com.jobplatform.backend.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private OtpService otpService;

    // ✅ REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        String fullName = request.get("fullName");
        String roleStr = request.getOrDefault("role", "JOB_SEEKER");

        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already exists!"));
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setFullName(fullName);
        user.setVerified(false);
        try {
            user.setRole(User.Role.valueOf(roleStr.toUpperCase()));
        } catch (Exception e) {
            user.setRole(User.Role.JOB_SEEKER);
        }

        userRepository.save(user);
        otpService.sendOtp(email);

        return ResponseEntity.ok(Map.of(
            "message", "Registration successful! OTP sent to " + email,
            "email", email
        ));
    }

    // ✅ VERIFY OTP
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");

        boolean isValid = otpService.verifyOtp(email, otp);
        if (!isValid) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid or expired OTP!"));
        }

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setVerified(true);
            userRepository.save(user);

            String token = jwtUtil.generateToken(user.getEmail(), user.getRole().toString());
            return ResponseEntity.ok(Map.of(
                "message", "Account verified successfully!",
                "token", token,
                "userId", user.getId(),
                "role", user.getRole(),
                "email", user.getEmail(),
                "fullName", user.getFullName() != null ? user.getFullName() : ""
            ));
        }

        return ResponseEntity.badRequest().body(Map.of("message", "User not found"));
    }

    // ✅ GOOGLE OAUTH SSO
    @PostMapping("/google")
    public ResponseEntity<?> googleAuth(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String fullName = request.get("fullName");
        String googleId = request.get("googleId");
        String avatarUrl = request.get("avatarUrl");
        String roleStr = request.getOrDefault("role", "JOB_SEEKER");

        Optional<User> existingUser = userRepository.findByEmail(email);
        User user;

        if (existingUser.isPresent()) {
            user = existingUser.get();
            if (user.getGoogleId() == null) {
                user.setGoogleId(googleId);
            }
            if (avatarUrl != null) {
                user.setAvatarUrl(avatarUrl);
            }
            user.setVerified(true);
        } else {
            user = new User();
            user.setEmail(email);
            user.setFullName(fullName);
            user.setGoogleId(googleId);
            user.setAvatarUrl(avatarUrl);
            user.setVerified(true);
            user.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
            try {
                user.setRole(User.Role.valueOf(roleStr.toUpperCase()));
            } catch (Exception e) {
                user.setRole(User.Role.JOB_SEEKER);
            }
        }

        userRepository.save(user);
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().toString());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("userId", user.getId());
        response.put("role", user.getRole());
        response.put("email", user.getEmail());
        response.put("fullName", user.getFullName());
        response.put("avatarUrl", user.getAvatarUrl());

        return ResponseEntity.ok(response);
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "User not found!"));
        }

        User user = userOptional.get();

        if (!user.isVerified()) {
            otpService.sendOtp(email);
            return ResponseEntity.status(403).body(Map.of(
                "message", "Account not verified! A new OTP has been sent to your email.",
                "requiresVerification", true,
                "email", email
            ));
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid credentials!"));
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().toString());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("userId", user.getId());
        response.put("role", user.getRole());
        response.put("email", user.getEmail());
        response.put("fullName", user.getFullName());
        response.put("avatarUrl", user.getAvatarUrl() != null ? user.getAvatarUrl() : "");

        return ResponseEntity.ok(response);
    }

    // ✅ FORGOT PASSWORD
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        if (!userRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email not found!"));
        }

        otpService.sendOtp(email);
        return ResponseEntity.ok(Map.of("message", "OTP sent to " + email + " for password reset."));
    }

    // ✅ RESET PASSWORD
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        String newPassword = request.get("newPassword");

        boolean isValid = otpService.verifyOtp(email, otp);
        if (!isValid) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid or expired OTP!"));
        }

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            return ResponseEntity.ok(Map.of("message", "Password reset successfully! You can now log in."));
        }

        return ResponseEntity.badRequest().body(Map.of("message", "User not found"));
    }
}
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

@RestController
@RequestMapping("/api/auth")
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
    public ResponseEntity<?> register(@RequestBody User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest()
                    .body("Email already exists!");
        }

        // Hash password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Account not verified yet
        user.setVerified(false);

        // Save user
        userRepository.save(user);

        // Auto send OTP
        otpService.sendOtp(user.getEmail());

        return ResponseEntity.ok(
                "Registration successful! OTP sent to " + user.getEmail()
        );
    }

    // ✅ VERIFY OTP — activates account
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String otp = request.get("otp");

        boolean isValid = otpService.verifyOtp(email, otp);

        if (!isValid) {
            return ResponseEntity.badRequest()
                    .body("Invalid or expired OTP!");
        }

        // Activate account
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setVerified(true);
            userRepository.save(user);
        }

        return ResponseEntity.ok("Account verified successfully! You can now login.");
    }

    // ✅ RESEND OTP
    @PostMapping("/resend-otp")
    public ResponseEntity<?> resendOtp(@RequestBody Map<String, String> request) {

        String email = request.get("email");

        if (!userRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest()
                    .body("Email not found!");
        }

        otpService.sendOtp(email);

        return ResponseEntity.ok("OTP resent to " + email);
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("User not found!");
        }

        User user = userOptional.get();

        // Check if account is verified
        if (!user.isVerified()) {
            return ResponseEntity.badRequest()
                    .body("Account not verified! Please verify your OTP first.");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.badRequest()
                    .body("Invalid password!");
        }

        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole().toString()
        );

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("role", user.getRole());
        response.put("email", user.getEmail());
        response.put("fullName", user.getFullName());

        return ResponseEntity.ok(response);
    }

    // ✅ FORGOT PASSWORD
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {

        String email = request.get("email");

        if (!userRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest()
                    .body("Email not found!");
        }

        otpService.sendOtp(email);

        return ResponseEntity.ok("OTP sent to " + email + " for password reset.");
    }

    // ✅ RESET PASSWORD
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String otp = request.get("otp");
        String newPassword = request.get("newPassword");

        // Verify OTP
        boolean isValid = otpService.verifyOtp(email, otp);
        if (!isValid) {
            return ResponseEntity.badRequest()
                    .body("Invalid or expired OTP!");
        }

        // Update password
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
        }

        return ResponseEntity.ok("Password reset successfully!");
    }
}
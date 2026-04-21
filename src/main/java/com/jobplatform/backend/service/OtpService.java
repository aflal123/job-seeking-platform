package com.jobplatform.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class OtpService {

    @Autowired
    private JavaMailSender mailSender;

    // Store OTPs temporarily in memory
    // Key = email, Value = OTP
    private Map<String, String> otpStorage = new HashMap<>();

    // Generate and send OTP
    public void sendOtp(String email) {

        // Generate 6 digit OTP
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);

        // Save OTP to memory
        otpStorage.put(email, otp);

        // Send email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Your OTP - Job Platform");
        message.setText("Your OTP is: " + otp + "\n\nThis OTP expires in 5 minutes.");

        mailSender.send(message);
    }

    // Verify OTP
    public boolean verifyOtp(String email, String otp) {

        String storedOtp = otpStorage.get(email);

        if (storedOtp != null && storedOtp.equals(otp)) {
            otpStorage.remove(email); // delete after use
            return true;
        }
        return false;
    }
}
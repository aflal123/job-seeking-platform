package com.jobplatform.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    private static class OtpEntry {
        String code;
        LocalDateTime expiresAt;

        OtpEntry(String code, LocalDateTime expiresAt) {
            this.code = code;
            this.expiresAt = expiresAt;
        }
    }

    private final Map<String, OtpEntry> otpStorage = new ConcurrentHashMap<>();

    public String generateOtp(String email) {
        String otp = String.format("%06d", new Random().nextInt(999999));
        // Valid for 10 minutes
        otpStorage.put(email.toLowerCase(), new OtpEntry(otp, LocalDateTime.now().plusMinutes(10)));
        return otp;
    }

    public void sendOtp(String email) {
        String otp = generateOtp(email);
        System.out.println("==================================================");
        System.out.println("🔐 [JobBook OTP Service] Generated OTP for " + email + ": " + otp);
        System.out.println("==================================================");

        if (mailSender != null) {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(email);
                message.setSubject("JobBook - Verification & Security OTP");
                message.setText("Your verification code is: " + otp + "\n\nThis code will expire in 10 minutes.\nIf you did not request this, please ignore this email.");
                mailSender.send(message);
            } catch (Exception e) {
                System.err.println("⚠️ Could not send live email (check SMTP settings): " + e.getMessage());
            }
        }
    }

    public boolean verifyOtp(String email, String inputOtp) {
        OtpEntry entry = otpStorage.get(email.toLowerCase());
        if (entry == null) {
            return false;
        }

        if (LocalDateTime.now().isAfter(entry.expiresAt)) {
            otpStorage.remove(email.toLowerCase());
            return false;
        }

        if (entry.code.equals(inputOtp.trim())) {
            otpStorage.remove(email.toLowerCase());
            return true;
        }

        return false;
    }
}

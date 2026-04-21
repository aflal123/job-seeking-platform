package com.jobplatform.backend.controller;

import com.jobplatform.backend.model.Job;
import com.jobplatform.backend.model.JobApplication;
import com.jobplatform.backend.model.User;
import com.jobplatform.backend.repository.JobApplicationRepository;
import com.jobplatform.backend.repository.JobRepository;
import com.jobplatform.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobApplicationRepository applicationRepository;

    // ✅ GET ALL USERS
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    // ✅ GET USER BY ID
    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("User not found!");
        }
        return ResponseEntity.ok(user.get());
    }

    // ✅ DELETE USER
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.badRequest()
                    .body("User not found!");
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully!");
    }

    // ✅ GET ALL JOBS
    @GetMapping("/jobs")
    public ResponseEntity<?> getAllJobs() {
        List<Job> jobs = jobRepository.findAll();
        return ResponseEntity.ok(jobs);
    }

    // ✅ DELETE JOB
    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable Long id) {
        if (!jobRepository.existsById(id)) {
            return ResponseEntity.badRequest()
                    .body("Job not found!");
        }
        jobRepository.deleteById(id);
        return ResponseEntity.ok("Job deleted successfully!");
    }

    // ✅ GET ALL APPLICATIONS
    @GetMapping("/applications")
    public ResponseEntity<?> getAllApplications() {
        List<JobApplication> applications = applicationRepository.findAll();
        return ResponseEntity.ok(applications);
    }

    // ✅ PLATFORM STATISTICS
    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        Map<String, Object> stats = new HashMap<>();

        stats.put("totalUsers", userRepository.count());
        stats.put("totalJobs", jobRepository.count());
        stats.put("totalApplications", applicationRepository.count());
        stats.put("totalSeekers",
                userRepository.countByRole(User.Role.SEEKER));
        stats.put("totalEmployers",
                userRepository.countByRole(User.Role.EMPLOYER));
        stats.put("totalTrainers",
                userRepository.countByRole(User.Role.TRAINER));

        return ResponseEntity.ok(stats);
    }
}
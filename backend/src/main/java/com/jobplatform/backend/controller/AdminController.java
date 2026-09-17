package com.jobplatform.backend.controller;

import com.jobplatform.backend.model.JobApplication;
import com.jobplatform.backend.model.User;
import com.jobplatform.backend.repository.CourseRepository;
import com.jobplatform.backend.repository.JobApplicationRepository;
import com.jobplatform.backend.repository.JobRepository;
import com.jobplatform.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobApplicationRepository applicationRepository;

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getAnalytics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalJobSeekers", userRepository.countByRole(User.Role.JOB_SEEKER));
        stats.put("totalEmployers", userRepository.countByRole(User.Role.EMPLOYER));
        stats.put("totalTrainers", userRepository.countByRole(User.Role.TRAINER));
        stats.put("totalJobs", jobRepository.count());
        stats.put("totalApplications", applicationRepository.count());
        stats.put("shortlistedApplications", applicationRepository.countByStatus(JobApplication.ApplicationStatus.SHORTLISTED));
        stats.put("totalCourses", courseRepository.count());
        stats.put("systemHealth", "OPTIMAL");
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
    }
}

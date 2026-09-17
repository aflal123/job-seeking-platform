package com.jobplatform.backend.controller;

import com.jobplatform.backend.model.JobApplication;
import com.jobplatform.backend.repository.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class JobApplicationController {

    @Autowired
    private JobApplicationRepository applicationRepository;

    @PostMapping("/apply")
    public ResponseEntity<?> applyForJob(@RequestBody JobApplication application) {
        if (applicationRepository.existsByJobIdAndApplicantId(application.getJobId(), application.getApplicantId())) {
            return ResponseEntity.badRequest().body(Map.of("message", "You have already applied for this position!"));
        }

        JobApplication saved = applicationRepository.save(application);
        return ResponseEntity.ok(Map.of(
            "message", "Application submitted successfully!",
            "application", saved
        ));
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<JobApplication>> getApplicationsByJob(@PathVariable Long jobId) {
        return ResponseEntity.ok(applicationRepository.findByJobId(jobId));
    }

    @GetMapping("/candidate/{applicantId}")
    public ResponseEntity<List<JobApplication>> getApplicationsByCandidate(@PathVariable Long applicantId) {
        return ResponseEntity.ok(applicationRepository.findByApplicantId(applicantId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateApplicationStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> statusUpdate) {
        
        Optional<JobApplication> optionalApp = applicationRepository.findById(id);
        if (optionalApp.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        JobApplication app = optionalApp.get();
        String newStatus = statusUpdate.get("status");
        try {
            app.setStatus(JobApplication.ApplicationStatus.valueOf(newStatus.toUpperCase()));
            applicationRepository.save(app);
            return ResponseEntity.ok(Map.of(
                "message", "Status updated successfully!",
                "status", app.getStatus()
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid application status"));
        }
    }
}

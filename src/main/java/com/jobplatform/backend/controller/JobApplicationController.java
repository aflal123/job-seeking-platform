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

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/applications")
public class JobApplicationController {

    @Autowired
    private JobApplicationRepository applicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    // ✅ APPLY FOR A JOB (Seeker)
    @PostMapping("/apply")
    public ResponseEntity<?> applyForJob(
            @RequestParam Long jobId,
            @RequestParam Long applicantId) {

        // Check job exists
        Optional<Job> job = jobRepository.findById(jobId);
        if (job.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Job not found!");
        }

        // Check job is open
        if (job.get().getStatus() != Job.JobStatus.OPEN) {
            return ResponseEntity.badRequest()
                    .body("This job is closed!");
        }

        // Check applicant exists
        Optional<User> applicant = userRepository.findById(applicantId);
        if (applicant.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("User not found!");
        }

        // Check role is SEEKER
        if (applicant.get().getRole() != User.Role.SEEKER) {
            return ResponseEntity.badRequest()
                    .body("Only seekers can apply for jobs!");
        }

        // Check already applied
        if (applicationRepository.existsByJobIdAndApplicantId(jobId, applicantId)) {
            return ResponseEntity.badRequest()
                    .body("You already applied for this job!");
        }

        // Save application
        JobApplication application = new JobApplication();
        application.setJob(job.get());
        application.setApplicant(applicant.get());
        applicationRepository.save(application);

        return ResponseEntity.ok("Applied successfully!");
    }

    // ✅ GET ALL APPLICATIONS FOR A JOB (Employer)
    @GetMapping("/job/{jobId}")
    public ResponseEntity<?> getApplicationsByJob(
            @PathVariable Long jobId) {

        List<JobApplication> applications =
                applicationRepository.findByJobId(jobId);
        return ResponseEntity.ok(applications);
    }

    // ✅ GET ALL APPLICATIONS BY SEEKER
    @GetMapping("/seeker/{applicantId}")
    public ResponseEntity<?> getApplicationsBySeeker(
            @PathVariable Long applicantId) {

        List<JobApplication> applications =
                applicationRepository.findByApplicantId(applicantId);
        return ResponseEntity.ok(applications);
    }

    // ✅ SHORTLIST / REJECT APPLICATION (Employer)
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestParam JobApplication.ApplicationStatus status) {

        Optional<JobApplication> application =
                applicationRepository.findById(id);

        if (application.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Application not found!");
        }

        application.get().setStatus(status);
        applicationRepository.save(application.get());

        return ResponseEntity.ok("Status updated to " + status);
    }
}
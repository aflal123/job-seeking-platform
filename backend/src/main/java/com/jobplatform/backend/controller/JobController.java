package com.jobplatform.backend.controller;

import com.jobplatform.backend.model.Job;
import com.jobplatform.backend.model.User;
import com.jobplatform.backend.repository.JobRepository;
import com.jobplatform.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    // ✅ POST A JOB (Employer)
    @PostMapping
    public ResponseEntity<?> postJob(
            @RequestBody Job job,
            @RequestParam Long employerId) {

        Optional<User> employer = userRepository.findById(employerId);

        if (employer.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Employer not found!");
        }

        if (employer.get().getRole() != User.Role.EMPLOYER) {
            return ResponseEntity.badRequest()
                    .body("Only employers can post jobs!");
        }

        job.setEmployerId(employerId);
        jobRepository.save(job);

        return ResponseEntity.ok("Job posted successfully!");
    }



    // ✅ GET ALL OPEN JOBS (With Optional Filters)
    @GetMapping
    public ResponseEntity<?> getAllJobs(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Job.JobType jobType
    ) {
        List<Job> jobs = jobRepository.findWithFilters(Job.JobStatus.OPEN, location, jobType);
        return ResponseEntity.ok(jobs);
    }

    // ✅ GET JOBS BY EMPLOYER
    @GetMapping("/employer/{employerId}")
    public ResponseEntity<?> getJobsByEmployer(
            @PathVariable Long employerId) {

        List<Job> jobs = jobRepository.findByEmployerId(employerId);
        return ResponseEntity.ok(jobs);
    }

    // ✅ CLOSE A JOB (Employer)
    @PutMapping("/{id}/close")
    public ResponseEntity<?> closeJob(@PathVariable Long id) {

        Optional<Job> jobOptional = jobRepository.findById(id);

        if (jobOptional.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Job not found!");
        }

        Job job = jobOptional.get();
        job.setStatus(Job.JobStatus.CLOSED);
        jobRepository.save(job);

        return ResponseEntity.ok("Job closed successfully!");
    }
}
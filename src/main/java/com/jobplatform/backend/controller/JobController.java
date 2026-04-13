package com.jobplatform.backend.controller;

import com.jobplatform.backend.dto.ApplicationRequest;
import com.jobplatform.backend.dto.JobRequest;
import com.jobplatform.backend.model.Application;
import com.jobplatform.backend.model.Job;
import com.jobplatform.backend.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    // Get all jobs with optional filters
    @GetMapping("/jobs")
    public ResponseEntity<List<Job>> getAllJobs(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String type) {
        return ResponseEntity.ok(jobService.searchJobs(keyword, location, type));
    }

    // Get single job
    @GetMapping("/jobs/{id}")
    public ResponseEntity<Job> getJob(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    // Post a new job — employer passes their userId as param for now
    @PostMapping("/jobs")
    public ResponseEntity<Job> postJob(
            @RequestParam Long employerId,
            @RequestBody JobRequest request) {
        return ResponseEntity.ok(jobService.postJob(employerId, request));
    }

    // Update a job
    @PutMapping("/jobs/{id}")
    public ResponseEntity<Job> updateJob(
            @PathVariable Long id,
            @RequestParam Long employerId,
            @RequestBody JobRequest request) {
        return ResponseEntity.ok(jobService.updateJob(id, employerId, request));
    }

    // Delete a job
    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<String> deleteJob(
            @PathVariable Long id,
            @RequestParam Long employerId) {
        jobService.deleteJob(id, employerId);
        return ResponseEntity.ok("Job deleted successfully");
    }

    // Apply for a job
    @PostMapping("/applications")
    public ResponseEntity<Application> apply(
            @RequestBody ApplicationRequest request) {
        return ResponseEntity.ok(jobService.applyForJob(request));
    }

    // Get all applications for a job
    @GetMapping("/jobs/{id}/applications")
    public ResponseEntity<List<Application>> getJobApplications(
            @PathVariable Long id) {
        return ResponseEntity.ok(jobService.getApplicationsForJob(id));
    }

    // Get my applications as a seeker
    @GetMapping("/applications/my/{seekerId}")
    public ResponseEntity<List<Application>> getMyApplications(
            @PathVariable Long seekerId) {
        return ResponseEntity.ok(jobService.getMyApplications(seekerId));
    }
}
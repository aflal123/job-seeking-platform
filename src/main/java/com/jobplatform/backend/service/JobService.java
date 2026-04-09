package com.jobplatform.backend.service;

import com.jobplatform.backend.dto.ApplicationRequest;
import com.jobplatform.backend.dto.JobRequest;
import com.jobplatform.backend.model.Application;
import com.jobplatform.backend.model.Job;
import com.jobplatform.backend.model.User;
import com.jobplatform.backend.repository.ApplicationRepository;
import com.jobplatform.backend.repository.JobRepository;
import com.jobplatform.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;

    // Get all active jobs with optional filters
    public List<Job> searchJobs(String keyword, String location, String type) {
        return jobRepository.searchJobs(keyword, location, type);
    }

    // Get one job by ID
    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
    }

    // Employer posts a new job
    public Job postJob(Long employerId, JobRequest request) {
        User employer = userRepository.findById(employerId)
                .orElseThrow(() -> new RuntimeException("Employer not found"));

        // Only employers can post jobs
        if (!employer.getRole().equals("employer")) {
            throw new RuntimeException("Only employers can post jobs");
        }

        Job job = new Job();
        job.setEmployer(employer);
        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setLocation(request.getLocation());
        job.setType(request.getType());
        job.setSkillsRequired(request.getSkillsRequired());
        job.setSalary(request.getSalary());

        return jobRepository.save(job);
    }

    // Employer updates their job
    public Job updateJob(Long jobId, Long employerId, JobRequest request) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // Make sure only the owner can update
        if (!job.getEmployer().getId().equals(employerId)) {
            throw new RuntimeException("You can only update your own jobs");
        }

        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setLocation(request.getLocation());
        job.setType(request.getType());
        job.setSkillsRequired(request.getSkillsRequired());
        job.setSalary(request.getSalary());

        return jobRepository.save(job);
    }

    // Employer deletes their job
    public void deleteJob(Long jobId, Long employerId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getEmployer().getId().equals(employerId)) {
            throw new RuntimeException("You can only delete your own jobs");
        }

        jobRepository.delete(job);
    }

    // Job seeker applies for a job
    public Application applyForJob(ApplicationRequest request) {

        // Check if already applied
        if (applicationRepository.existsByJobIdAndSeekerId(
                request.getJobId(), request.getSeekerId())) {
            throw new RuntimeException("You already applied for this job");
        }

        Job job = jobRepository.findById(request.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found"));

        User seeker = userRepository.findById(request.getSeekerId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Application application = new Application();
        application.setJob(job);
        application.setSeeker(seeker);
        application.setCoverLetter(request.getCoverLetter());

        return applicationRepository.save(application);
    }

    // Get all applications for a job (employer views)
    public List<Application> getApplicationsForJob(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    // Get all applications by a seeker (job seeker views their own)
    public List<Application> getMyApplications(Long seekerId) {
        return applicationRepository.findBySeekerId(seekerId);
    }
}
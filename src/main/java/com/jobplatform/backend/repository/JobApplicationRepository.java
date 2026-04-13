package com.jobplatform.backend.repository;

import com.jobplatform.backend.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    // Get all applications for a job
    List<JobApplication> findByJobId(Long jobId);

    // Get all applications by a seeker
    List<JobApplication> findByApplicantId(Long applicantId);

    // Check if seeker already applied
    boolean existsByJobIdAndApplicantId(Long jobId, Long applicantId);
}
package com.jobplatform.backend.repository;

import com.jobplatform.backend.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByJobId(Long jobId);

    List<JobApplication> findByApplicantId(Long applicantId);

    List<JobApplication> findByJobIdAndStatus(Long jobId, JobApplication.ApplicationStatus status);

    boolean existsByJobIdAndApplicantId(Long jobId, Long applicantId);

    long countByStatus(JobApplication.ApplicationStatus status);
}

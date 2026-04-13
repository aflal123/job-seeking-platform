package com.jobplatform.backend.repository;

import com.jobplatform.backend.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    // Get all open jobs
    List<Job> findByStatus(Job.JobStatus status);

    // Get all jobs by employer
    List<Job> findByEmployerId(Long employerId);
}
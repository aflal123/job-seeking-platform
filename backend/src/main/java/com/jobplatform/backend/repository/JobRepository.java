package com.jobplatform.backend.repository;

import com.jobplatform.backend.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    // Get all open jobs
    List<Job> findByStatus(Job.JobStatus status);

    // Get jobs with optional filters
    @Query("SELECT j FROM Job j WHERE j.status = :status " +
           "AND (:location IS NULL OR j.location = :location) " +
           "AND (:jobType IS NULL OR j.jobType = :jobType)")
    List<Job> findWithFilters(@Param("status") Job.JobStatus status, 
                              @Param("location") String location, 
                              @Param("jobType") Job.JobType jobType);

    // Get all jobs by employer
    List<Job> findByEmployerId(Long employerId);
}
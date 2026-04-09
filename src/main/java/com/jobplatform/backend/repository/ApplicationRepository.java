package com.jobplatform.backend.repository;

import com.jobplatform.backend.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    // All applications for a specific job
    List<Application> findByJobId(Long jobId);

    // All applications by a specific job seeker
    List<Application> findBySeekerId(Long seekerId);

    // Check if seeker already applied for this job
    boolean existsByJobIdAndSeekerId(Long jobId, Long seekerId);
}
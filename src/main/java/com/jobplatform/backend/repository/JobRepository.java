package com.jobplatform.backend.repository;

import com.jobplatform.backend.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    // Find jobs by employer
    List<Job> findByEmployerId(Long employerId);

    // Search jobs by keyword in title or description
    @Query("SELECT j FROM Job j WHERE " +
            "(:keyword IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) AND " +
            "(:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
            "(:type IS NULL OR j.type = :type) AND " +
            "j.status = 'active'")
    List<Job> searchJobs(
            @Param("keyword") String keyword,
            @Param("location") String location,
            @Param("type") String type
    );
}
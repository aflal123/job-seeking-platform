package com.jobplatform.backend.repository;

import com.jobplatform.backend.model.CourseEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseEnrollmentRepository
        extends JpaRepository<CourseEnrollment, Long> {

    // Get all enrollments for a course
    List<CourseEnrollment> findByCourseId(Long courseId);

    // Get all enrollments by a user
    List<CourseEnrollment> findByUserId(Long userId);

    // Check if already enrolled
    boolean existsByCourseIdAndUserId(Long courseId, Long userId);
}
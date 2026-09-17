package com.jobplatform.backend.repository;

import com.jobplatform.backend.model.CourseEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseEnrollmentRepository extends JpaRepository<CourseEnrollment, Long> {

    List<CourseEnrollment> findByStudentId(Long studentId);

    Optional<CourseEnrollment> findByCourseIdAndStudentId(Long courseId, Long studentId);

    long countByCourseId(Long courseId);
}

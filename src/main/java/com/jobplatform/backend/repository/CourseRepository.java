package com.jobplatform.backend.repository;

import com.jobplatform.backend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    // Get all courses by trainer
    List<Course> findByTrainerId(Long trainerId);
}
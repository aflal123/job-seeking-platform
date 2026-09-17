package com.jobplatform.backend.controller;

import com.jobplatform.backend.model.Course;
import com.jobplatform.backend.model.CourseEnrollment;
import com.jobplatform.backend.repository.CourseEnrollmentRepository;
import com.jobplatform.backend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseEnrollmentRepository enrollmentRepository;

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses(@RequestParam(required = false) String category) {
        if (category != null && !category.isEmpty()) {
            return ResponseEntity.ok(courseRepository.findByCategory(category));
        }
        return ResponseEntity.ok(courseRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        return courseRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createCourse(@RequestBody Course course) {
        Course saved = courseRepository.save(course);
        return ResponseEntity.ok(Map.of(
            "message", "Course published successfully!",
            "course", saved
        ));
    }

    @PostMapping("/{courseId}/enroll")
    public ResponseEntity<?> enrollInCourse(@PathVariable Long courseId, @RequestBody Map<String, Long> payload) {
        Long studentId = payload.get("studentId");
        if (studentId == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Student ID is required"));
        }

        Optional<CourseEnrollment> existing = enrollmentRepository.findByCourseIdAndStudentId(courseId, studentId);
        if (existing.isPresent()) {
            return ResponseEntity.ok(Map.of("message", "Already enrolled in this course", "enrollment", existing.get()));
        }

        CourseEnrollment enrollment = CourseEnrollment.builder()
                .courseId(courseId)
                .studentId(studentId)
                .progressPercentage(0)
                .completed(false)
                .build();

        CourseEnrollment saved = enrollmentRepository.save(enrollment);

        // Update enrollment count
        courseRepository.findById(courseId).ifPresent(c -> {
            c.setEnrollmentsCount(c.getEnrollmentsCount() + 1);
            courseRepository.save(c);
        });

        return ResponseEntity.ok(Map.of("message", "Enrolled successfully!", "enrollment", saved));
    }

    @GetMapping("/student/{studentId}/enrollments")
    public ResponseEntity<List<CourseEnrollment>> getStudentEnrollments(@PathVariable Long studentId) {
        return ResponseEntity.ok(enrollmentRepository.findByStudentId(studentId));
    }
}

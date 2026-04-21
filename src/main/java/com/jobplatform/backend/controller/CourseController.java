package com.jobplatform.backend.controller;

import com.jobplatform.backend.model.Course;
import com.jobplatform.backend.model.CourseEnrollment;
import com.jobplatform.backend.model.User;
import com.jobplatform.backend.repository.CourseEnrollmentRepository;
import com.jobplatform.backend.repository.CourseRepository;
import com.jobplatform.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseEnrollmentRepository enrollmentRepository;

    @Autowired
    private UserRepository userRepository;

    // ✅ CREATE COURSE (Trainer)
    @PostMapping
    public ResponseEntity<?> createCourse(
            @RequestBody Course course,
            @RequestParam Long trainerId) {

        Optional<User> trainer = userRepository.findById(trainerId);

        if (trainer.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Trainer not found!");
        }

        if (trainer.get().getRole() != User.Role.TRAINER) {
            return ResponseEntity.badRequest()
                    .body("Only trainers can create courses!");
        }

        course.setTrainer(trainer.get());
        courseRepository.save(course);

        return ResponseEntity.ok("Course created successfully!");
    }

    // ✅ GET ALL COURSES
    @GetMapping
    public ResponseEntity<?> getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        return ResponseEntity.ok(courses);
    }

    // ✅ GET COURSE BY ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getCourseById(@PathVariable Long id) {

        Optional<Course> course = courseRepository.findById(id);

        if (course.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Course not found!");
        }

        return ResponseEntity.ok(course.get());
    }

    // ✅ GET COURSES BY TRAINER
    @GetMapping("/trainer/{trainerId}")
    public ResponseEntity<?> getCoursesByTrainer(
            @PathVariable Long trainerId) {

        List<Course> courses = courseRepository.findByTrainerId(trainerId);
        return ResponseEntity.ok(courses);
    }

    // ✅ ENROLL IN COURSE (Seeker)
    @PostMapping("/{courseId}/enroll")
    public ResponseEntity<?> enrollCourse(
            @PathVariable Long courseId,
            @RequestParam Long userId) {

        Optional<Course> course = courseRepository.findById(courseId);
        if (course.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Course not found!");
        }

        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("User not found!");
        }

        if (user.get().getRole() != User.Role.SEEKER) {
            return ResponseEntity.badRequest()
                    .body("Only seekers can enroll in courses!");
        }

        if (enrollmentRepository.existsByCourseIdAndUserId(courseId, userId)) {
            return ResponseEntity.badRequest()
                    .body("Already enrolled in this course!");
        }

        CourseEnrollment enrollment = new CourseEnrollment();
        enrollment.setCourse(course.get());
        enrollment.setUser(user.get());
        enrollmentRepository.save(enrollment);

        return ResponseEntity.ok("Enrolled successfully!");
    }

    // ✅ UPDATE PROGRESS
    @PutMapping("/{courseId}/progress")
    public ResponseEntity<?> updateProgress(
            @PathVariable Long courseId,
            @RequestParam Long userId,
            @RequestParam int progress) {

        List<CourseEnrollment> enrollments =
                enrollmentRepository.findByCourseId(courseId);

        for (CourseEnrollment enrollment : enrollments) {
            if (enrollment.getUser().getId().equals(userId)) {
                enrollment.setProgress(progress);
                enrollmentRepository.save(enrollment);
                return ResponseEntity.ok("Progress updated to " + progress + "%");
            }
        }

        return ResponseEntity.badRequest()
                .body("Enrollment not found!");
    }

    // ✅ GET MY ENROLLMENTS
    @GetMapping("/my-courses/{userId}")
    public ResponseEntity<?> getMyCourses(@PathVariable Long userId) {
        List<CourseEnrollment> enrollments =
                enrollmentRepository.findByUserId(userId);
        return ResponseEntity.ok(enrollments);
    }
}
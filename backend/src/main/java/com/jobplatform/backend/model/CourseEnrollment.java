package com.jobplatform.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "course_enrollments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseEnrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long courseId;

    private Long studentId;

    private int progressPercentage;

    private boolean completed;

    private LocalDateTime enrolledAt;

    @PrePersist
    protected void onCreate() {
        this.enrolledAt = LocalDateTime.now();
        this.progressPercentage = 0;
        this.completed = false;
    }
}

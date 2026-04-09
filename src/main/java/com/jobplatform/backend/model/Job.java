package com.jobplatform.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The employer who posted this job
    @ManyToOne
    @JoinColumn(name = "employer_id", nullable = false)
    private User employer;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    private String location;

    // "full-time", "part-time", "remote", "internship"
    private String type;

    // "active", "closed"
    private String status = "active";

    private String skillsRequired;

    private String salary;

    @Column(name = "posted_at")
    private LocalDateTime postedAt;

    @PrePersist
    public void prePersist() {
        this.postedAt = LocalDateTime.now();
    }
}
package com.jobplatform.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "jobs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String companyName;

    private String location;

    private String salaryRange;

    @Enumerated(EnumType.STRING)
    private JobType jobType;

    @Enumerated(EnumType.STRING)
    private JobStatus status;

    private Long employerId;

    private String requirements;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = JobStatus.OPEN;
        }
        if (this.jobType == null) {
            this.jobType = JobType.FULL_TIME;
        }
    }

    public enum JobType {
        FULL_TIME,
        PART_TIME,
        CONTRACT,
        REMOTE,
        INTERNSHIP
    }

    public enum JobStatus {
        OPEN,
        CLOSED,
        DRAFT
    }
}

package com.jobplatform.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String fullName;

    private String phone;

    @Enumerated(EnumType.STRING)
    private Role role;

    private boolean verified;

    private String googleId;

    private String avatarUrl;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private String resumeUrl;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public enum Role {
        JOB_SEEKER,
        EMPLOYER,
        TRAINER,
        ADMIN
    }
}

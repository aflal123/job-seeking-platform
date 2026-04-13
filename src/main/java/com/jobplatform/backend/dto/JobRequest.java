package com.jobplatform.backend.dto;

import lombok.Data;

@Data
public class JobRequest {
    private String title;
    private String description;
    private String location;
    private String type;
    private String skillsRequired;
    private String salary;
}
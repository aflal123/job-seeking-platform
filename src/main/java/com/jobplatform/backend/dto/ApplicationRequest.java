package com.jobplatform.backend.dto;

import lombok.Data;

@Data
public class ApplicationRequest {
    private Long jobId;
    private Long seekerId;
    private String coverLetter;
}
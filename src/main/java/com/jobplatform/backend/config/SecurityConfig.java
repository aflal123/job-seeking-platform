package com.jobplatform.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/jobs/**").permitAll()
                        .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/jobs/**").permitAll()
                        .requestMatchers(org.springframework.http.HttpMethod.PUT, "/api/jobs/**").permitAll()
                        .requestMatchers(org.springframework.http.HttpMethod.DELETE, "/api/jobs/**").permitAll()
                        .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/applications/**").permitAll()
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/applications/**").permitAll()
                        .anyRequest().authenticated()
                );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // encrypts passwords
    }
}
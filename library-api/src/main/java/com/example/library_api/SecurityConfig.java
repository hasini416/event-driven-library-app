package com.example.library_api;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // 1. Disable CSRF so Postman and Frontend can POST easily
                .csrf(csrf -> csrf.disable())

                // 2. Allow all requests for now so you don't need a login
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                )

                // 3. Enable CORS so your frontend (e.g., port 5500) can talk to backend (8080)
                .cors(Customizer.withDefaults());

        return http.build();
    }
}
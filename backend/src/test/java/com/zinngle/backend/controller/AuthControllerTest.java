package com.zinngle.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zinngle.backend.dto.AuthRequest;
import com.zinngle.backend.model.User;
import com.zinngle.backend.repository.UserRepository;
import com.zinngle.backend.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SuppressWarnings("unused")
@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll(); // Clear database before each test
    }

    @SuppressWarnings("null")
    @Test
    void testRegisterUser_success() throws Exception {
        AuthRequest authRequest = new AuthRequest();
        authRequest.setEmail("test@example.com");
        authRequest.setPassword("password123");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(authRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("User registered successfully."));
    }

    @SuppressWarnings("null")
    @Test
    void testRegisterUser_duplicateEmail() throws Exception {
        // Register once
        authService.registerUser("duplicate@example.com", "password123", "duplicate");

        AuthRequest authRequest = new AuthRequest();
        authRequest.setEmail("duplicate@example.com");
        authRequest.setPassword("password123");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(authRequest)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.message").value("User with this email already exists."));
    }

    @SuppressWarnings("null")
    @Test
    void testLoginUser_success() throws Exception {
        // Register a user first
        authService.registerUser("login@example.com", "loginpassword", "loginuser");

        AuthRequest authRequest = new AuthRequest();
        authRequest.setEmail("login@example.com");
        authRequest.setPassword("loginpassword");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(authRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.message").value("User logged in successfully."));
    }

    @SuppressWarnings("null")
    @Test
    void testLoginUser_invalidCredentials() throws Exception {
        AuthRequest authRequest = new AuthRequest();
        authRequest.setEmail("nonexistent@example.com");
        authRequest.setPassword("wrongpassword");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(authRequest)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message").value("Invalid credentials."));
    }

    @SuppressWarnings("null")
    @Test
    void testLoginUser_incorrectPassword() throws Exception {
        authService.registerUser("wrongpass@example.com", "correctpassword", "wrongpass");

        AuthRequest authRequest = new AuthRequest();
        authRequest.setEmail("wrongpass@example.com");
        authRequest.setPassword("incorrect");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(authRequest)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message").value("Invalid credentials."));
    }
}

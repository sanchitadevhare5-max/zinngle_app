package com.zinngle.backend.controller;

import com.zinngle.backend.dto.AuthRequest;
import com.zinngle.backend.dto.AuthResponse;
import com.zinngle.backend.model.User;
import com.zinngle.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerUser(@RequestBody AuthRequest authRequest) {
        String name = authRequest.getEmail().split("@")[0]; // Simple name extraction
        Optional<User> registeredUser = authService.registerUser(authRequest.getEmail(), authRequest.getPassword(), name);
        if (registeredUser.isPresent()) {
            return ResponseEntity.ok(new AuthResponse(null, "User registered successfully."));
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new AuthResponse(null, "User with this email already exists."));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUser(@RequestBody AuthRequest authRequest) {
        Optional<User> userOptional = authService.findByEmail(authRequest.getEmail());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (authService.verifyPassword(authRequest.getPassword(), user.getPasswordHash())) {
                // In a real application, generate a proper JWT token here
                String token = "dummy-jwt-token-for-" + user.getEmail();
                return ResponseEntity.ok(new AuthResponse(token, "User logged in successfully."));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse(null, "Invalid credentials."));
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse(null, "Invalid credentials."));
        }
    }
}

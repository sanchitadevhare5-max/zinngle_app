package com.zinngle.backend.service;

import com.zinngle.backend.enums.UserType;
import com.zinngle.backend.model.User;
import com.zinngle.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private String hashPassword(String password) {
        return passwordEncoder.encode(password);
    }

    public Optional<User> registerUser(String email, String password, String name) {
        if (userRepository.findByEmail(email).isPresent()) {
            return Optional.empty(); // User with this email already exists
        }

        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(hashPassword(password));
        user.setName(name);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        user.setUserType(UserType.REGULAR_USER); // Assign default user type
        return Optional.of(userRepository.save(user));
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean verifyPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}

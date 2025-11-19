package com.announcementservice.authservice.controller;

import com.announcementservice.authservice.dto.JwtRequest;
import com.announcementservice.authservice.dto.RefreshJwtRequest;
import com.announcementservice.authservice.dto.UserDto;
import com.announcementservice.authservice.entity.RegistrationUserDto;
import com.announcementservice.authservice.service.AuthService;
import com.announcementservice.authservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private AuthService authService;
    @Autowired
    private UserService userService;


    @PostMapping("/auth")
    public ResponseEntity<?> createAuthToken(@RequestBody JwtRequest authRequest) {
        return authService.createAuthToken(authRequest);
    }

    // TODO: - Not Check
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshJwtRequest refreshJwtRequest) {
        return authService.refresh(refreshJwtRequest);
    }

    @PostMapping("/registration")
    public ResponseEntity<?> createNewUser(@RequestBody RegistrationUserDto registrationUserDto) {
        return authService.createNewUser(registrationUserDto);
    }

    @GetMapping("/users")
    public List<UserDto> getUser() {
        return userService.getAllUsers();
    }

    @GetMapping("/roles")
    public String getRole() {
        return "roles";
    }

    @GetMapping("/info")
    public String getInfo() {
        return "info";
    }
}
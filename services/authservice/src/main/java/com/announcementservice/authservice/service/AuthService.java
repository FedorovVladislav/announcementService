package com.announcementservice.authservice.service;

import com.announcementservice.authservice.dto.JwtRequest;
import com.announcementservice.authservice.dto.JwtResponse;
import com.announcementservice.authservice.dto.RefreshJwtRequest;
import com.announcementservice.authservice.dto.UserDto;
import com.announcementservice.authservice.entity.RegistrationUserDto;
import com.announcementservice.authservice.entity.User;
import com.announcementservice.authservice.exception.ApiError;
import com.announcementservice.authservice.utils.JwtTokenUtils;
import io.jsonwebtoken.Claims;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class AuthService {
    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    @Autowired
    private UserService userService;
    @Autowired
    private JwtTokenUtils jwtTokenUtils;
    @Autowired
    private AuthenticationManager authenticationManager;

    public ResponseEntity<?> createAuthToken(@RequestBody JwtRequest authRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>(new ApiError(HttpStatus.UNAUTHORIZED.toString(), "Неправильный логин или пароль"), HttpStatus.UNAUTHORIZED);
        }
        UserDetails userDetails = userService.loadUserByUsername(authRequest.getUsername());
        String token = jwtTokenUtils.generateToken(userDetails);
        String refreshToken = jwtTokenUtils.generateRefreshToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token, refreshToken));
    }

    //TODO: -Not Check
    public ResponseEntity<?> refresh(RefreshJwtRequest refreshToken) {
        var refreshTokenValue = refreshToken.getRefreshToken();
        if (jwtTokenUtils.validateRefreshToken(refreshTokenValue)) {
            final Claims claims = jwtTokenUtils.getRefreshClaims(refreshTokenValue);
            final String login = claims.getSubject();
            UserDetails user = userService.loadUserByUsername(login);
            final String accessToken = jwtTokenUtils.generateToken(user);
            final String newRefreshToken = jwtTokenUtils.generateRefreshToken(user);
            return ResponseEntity.ok(new JwtResponse(accessToken, newRefreshToken));
        }
        return new ResponseEntity<>(new ApiError(HttpStatus.UNAUTHORIZED.toString(), "Невалидный JWT токен"), HttpStatus.UNAUTHORIZED);
    }

    public ResponseEntity<?> createNewUser(@RequestBody RegistrationUserDto registrationUserDto) {

        if (userService.findByUsername(registrationUserDto.getUsername()) != null) {
            return new ResponseEntity<>(new ApiError(HttpStatus.BAD_REQUEST.toString(), "Пользователь с указанным именем уже существует"), HttpStatus.BAD_REQUEST);
        }
        if (userService.findByEmail(registrationUserDto.getEmail()) != null) {
            return new ResponseEntity<>(new ApiError(HttpStatus.BAD_REQUEST.toString(), "Пользователь с указанным email уже существует"), HttpStatus.BAD_REQUEST);
        }
        User user = userService.createNewUser(registrationUserDto);
        log.debug("User with name {} successful registered", user.getName());
        return ResponseEntity.ok(new UserDto(user.getId(), user.getName(), user.getEmail()));
    }

    public Long getUserId() {
        return Long.valueOf(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
    }
}
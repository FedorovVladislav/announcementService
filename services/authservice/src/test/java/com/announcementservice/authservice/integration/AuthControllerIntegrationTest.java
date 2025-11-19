package com.announcementservice.authservice.integration;

import com.announcementservice.authservice.controller.UserController;
import com.announcementservice.authservice.dto.JwtRequest;
import com.announcementservice.authservice.dto.JwtResponse;
import com.announcementservice.authservice.dto.RefreshJwtRequest;
import com.announcementservice.authservice.dto.UserDto;
import com.announcementservice.authservice.entity.RegistrationUserDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;

import org.springframework.http.*;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AuthControllerIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    private HttpHeaders headers;

    @BeforeEach
    public void setUp() {
        headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
    }

    @Test
    void testRegistrationAndAuthFlow() {
        // 1️⃣ Регистрация нового пользователя
        RegistrationUserDto registrationUser = new RegistrationUserDto();
        registrationUser.setUsername("testuser");
        registrationUser.setPassword("password123");
        registrationUser.setEmail("testuser@example.com");

        HttpEntity<RegistrationUserDto> regRequest = new HttpEntity<>(registrationUser, headers);
        ResponseEntity<String> regResponse = restTemplate.postForEntity("/registration", regRequest, String.class);
        assertThat(regResponse.getStatusCode()).isEqualTo(HttpStatus.OK);

        // 2️⃣ Аутентификация пользователя
        JwtRequest jwtRequest = new JwtRequest("testuser");
        jwtRequest.setPassword("password123");

        HttpEntity<JwtRequest> authRequest = new HttpEntity<>(jwtRequest, headers);
        ResponseEntity<JwtResponse> authResponse = restTemplate.postForEntity("/auth", authRequest, JwtResponse.class);
        assertThat(authResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(authResponse.getBody().getAccessToken()).isNotNull(); // предполагаем, что тело содержит JWT

        // 3️⃣ Обновление токена (refresh)
        RefreshJwtRequest refreshRequest = new RefreshJwtRequest(authResponse.getBody().getRefreshToken());
        refreshRequest.setRefreshToken("dummy-refresh-token"); // подставьте реальный токен из authResponse

        HttpEntity<RefreshJwtRequest> refreshEntity = new HttpEntity<>(refreshRequest, headers);
        ResponseEntity<String> refreshResponse = restTemplate.postForEntity("/refresh", refreshEntity, String.class);
        assertThat(refreshResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(refreshResponse.getBody()).contains("token"); // новый JWT
    }

    @Test
    void testGetUsers() {
        // Получаем список пользователей
        ResponseEntity<UserDto[]> response = restTemplate.getForEntity("/users", UserDto[].class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

        UserDto[] users = response.getBody();
        assertThat(users).isNotNull();
        // Проверка, что есть хотя бы один пользователь
        assertThat(users.length).isGreaterThanOrEqualTo(1);
    }
}

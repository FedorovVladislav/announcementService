package com.announcementservice.authservice.integration;

import com.announcementservice.authservice.controller.UserController;
import com.announcementservice.authservice.dto.JwtRequest;
import com.announcementservice.authservice.dto.JwtResponse;
import com.announcementservice.authservice.dto.RefreshJwtRequest;
import com.announcementservice.authservice.dto.UserDto;
import com.announcementservice.authservice.entity.RegistrationUserDto;
import com.announcementservice.authservice.entity.User;
import com.announcementservice.authservice.repository.UserRepository;
import org.junit.jupiter.api.*;
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

    @Autowired
    private UserRepository userRepository;
    private Long testUserId;

    @BeforeEach
    public void setUp() {
        headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
    }

    @Test
    void testRegistrationAndAuthFlow() {
        // 1️⃣ Регистрация нового пользователя
        RegistrationUserDto registrationUser = new RegistrationUserDto();
        registrationUser.setUsername("testuser3");
        registrationUser.setPassword("password1231");
        registrationUser.setEmail("testuser3@example.com");

        HttpEntity<RegistrationUserDto> regRequest = new HttpEntity<>(registrationUser, headers);
        ResponseEntity<UserDto> regResponse = restTemplate.postForEntity("/registration", regRequest, UserDto.class);
        assertThat(regResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        Assertions.assertNotNull(regResponse.getBody());
        assertThat(regResponse.getBody().getUsername()).isEqualTo("testuser3");
        assertThat(regResponse.getBody().getEmail()).isEqualTo("testuser3@example.com");
        testUserId = regResponse.getBody().getId();

        // 2️⃣ Аутентификация пользователя
        JwtRequest jwtRequest = new JwtRequest("testuser3");
        jwtRequest.setPassword("password1231");

        HttpEntity<JwtRequest> authRequest = new HttpEntity<>(jwtRequest, headers);
        ResponseEntity<JwtResponse> authResponse = restTemplate.postForEntity("/auth", authRequest, JwtResponse.class);
        assertThat(authResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        Assertions.assertNotNull(authResponse.getBody());
        String accessToken = authResponse.getBody().getAccessToken();
        assertThat(accessToken).isNotNull();
        assertThat(authResponse.getBody().getRefreshToken()).isNotNull();
        assertThat(authResponse.getBody().getRefreshToken()).isNotEqualTo(accessToken);

        var refreshToken = authResponse.getBody().getRefreshToken();
        // 3️⃣ Обновление токена (refresh)
        RefreshJwtRequest refreshRequest = new RefreshJwtRequest(authResponse.getBody().getRefreshToken());
        refreshRequest.setRefreshToken(refreshToken);

        HttpEntity<RefreshJwtRequest> refreshEntity = new HttpEntity<>(refreshRequest, headers);
        ResponseEntity<JwtResponse> refreshResponse = restTemplate.postForEntity("/refresh", refreshEntity, JwtResponse.class);
        assertThat(refreshResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(refreshResponse).isNotNull();
        Assertions.assertNotNull(refreshResponse.getBody());// предполагаем, что тело содержит JWT
        assertThat(refreshResponse.getBody().getAccessToken()).isNotNull(); // предполагаем, что тело содержит AccessToken
        assertThat(refreshResponse.getBody().getAccessToken()).isNotEqualTo(accessToken); // предполагаем, новый не равен первому
    }

    @AfterEach
    public void cleanup() {
        userRepository.deleteById(testUserId);
    }
}

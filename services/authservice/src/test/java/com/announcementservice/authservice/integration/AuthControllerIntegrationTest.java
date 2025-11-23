package com.announcementservice.authservice.integration;

import com.announcementservice.authservice.dto.JwtRequest;
import com.announcementservice.authservice.dto.JwtResponse;
import com.announcementservice.authservice.dto.RefreshJwtRequest;
import com.announcementservice.authservice.dto.UserDto;
import com.announcementservice.authservice.entity.RegistrationUserDto;
import com.announcementservice.authservice.entity.Role;
import com.announcementservice.authservice.exception.ApiError;
import com.announcementservice.authservice.repository.RoleRepository;
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
    
    @Autowired
    private RoleRepository roleRepository;
    
    private Long testUserId;
    private Long duplicateTestUserId;

    @BeforeEach
    public void setUp() {
        headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        // Создаем роль ROLE_USER, если её нет (для тестов без Liquibase)
        if (roleRepository.findByName("ROLE_USER") == null) {
            Role role = new Role("ROLE_USER");
            roleRepository.save(role);
        }
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

    @Test
    void testDuplicateRegistration() {
        // 1️⃣ Регистрация первого пользователя
        RegistrationUserDto firstUser = new RegistrationUserDto();
        firstUser.setUsername("duplicateuser");
        firstUser.setPassword("password123");
        firstUser.setEmail("duplicateuser@example.com");

        HttpEntity<RegistrationUserDto> firstRequest = new HttpEntity<>(firstUser, headers);
        ResponseEntity<UserDto> firstResponse = restTemplate.postForEntity("/registration", firstRequest, UserDto.class);
        
        assertThat(firstResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(firstResponse.getBody()).isNotNull();
        assertThat(firstResponse.getBody().getUsername()).isEqualTo("duplicateuser");
        assertThat(firstResponse.getBody().getEmail()).isEqualTo("duplicateuser@example.com");
        duplicateTestUserId = firstResponse.getBody().getId();

        // 2️⃣ Попытка регистрации с тем же username (но другим email)
        RegistrationUserDto duplicateUsername = new RegistrationUserDto();
        duplicateUsername.setUsername("duplicateuser"); // Тот же username
        duplicateUsername.setPassword("password456");
        duplicateUsername.setEmail("different@example.com"); // Другой email

        HttpEntity<RegistrationUserDto> duplicateUsernameRequest = new HttpEntity<>(duplicateUsername, headers);
        ResponseEntity<ApiError> duplicateUsernameResponse = restTemplate.postForEntity(
            "/registration", 
            duplicateUsernameRequest, 
            ApiError.class
        );

        assertThat(duplicateUsernameResponse.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(duplicateUsernameResponse.getBody()).isNotNull();
        assertThat(duplicateUsernameResponse.getBody().getDescription())
            .isEqualTo("Пользователь с указанным именем уже существует");

        // 3️⃣ Попытка регистрации с тем же email (но другим username)
        RegistrationUserDto duplicateEmail = new RegistrationUserDto();
        duplicateEmail.setUsername("differentuser"); // Другой username
        duplicateEmail.setPassword("password789");
        duplicateEmail.setEmail("duplicateuser@example.com"); // Тот же email

        HttpEntity<RegistrationUserDto> duplicateEmailRequest = new HttpEntity<>(duplicateEmail, headers);
        ResponseEntity<ApiError> duplicateEmailResponse = restTemplate.postForEntity(
            "/registration", 
            duplicateEmailRequest, 
            ApiError.class
        );

        assertThat(duplicateEmailResponse.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(duplicateEmailResponse.getBody()).isNotNull();
        assertThat(duplicateEmailResponse.getBody().getDescription())
            .isEqualTo("Пользователь с указанным email уже существует");

        // 4️⃣ Попытка регистрации с теми же username и email
        RegistrationUserDto duplicateBoth = new RegistrationUserDto();
        duplicateBoth.setUsername("duplicateuser"); // Тот же username
        duplicateBoth.setPassword("password999");
        duplicateBoth.setEmail("duplicateuser@example.com"); // Тот же email

        HttpEntity<RegistrationUserDto> duplicateBothRequest = new HttpEntity<>(duplicateBoth, headers);
        ResponseEntity<ApiError> duplicateBothResponse = restTemplate.postForEntity(
            "/registration", 
            duplicateBothRequest, 
            ApiError.class
        );

        // Должна вернуться ошибка (проверка username происходит первой)
        assertThat(duplicateBothResponse.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(duplicateBothResponse.getBody()).isNotNull();
        assertThat(duplicateBothResponse.getBody().getDescription())
            .isEqualTo("Пользователь с указанным именем уже существует");
    }

    @AfterEach
    public void cleanup() {
        if (testUserId != null) {
            userRepository.deleteById(testUserId);
        }
        if (duplicateTestUserId != null) {
            userRepository.deleteById(duplicateTestUserId);
        }
        // Очищаем созданных пользователей для теста дубликатов
        var duplicateUser = userRepository.findByName("duplicateuser");
        if (duplicateUser != null) {
            userRepository.delete(duplicateUser);
        }
    }
}

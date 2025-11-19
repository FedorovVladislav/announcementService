package com.announcementservice.authservice.repository;

import com.announcementservice.authservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByName(String name);

    User findByEmail(String email);
}
package com.announcementservice.authservice.repository;


import com.announcementservice.authservice.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(String name);
}
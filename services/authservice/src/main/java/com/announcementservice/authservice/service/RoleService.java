package com.announcementservice.authservice.service;


import com.announcementservice.authservice.entity.Role;
import com.announcementservice.authservice.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;


    public Role getUserRole() {
        Role role = roleRepository.findByName("ROLE_USER");
        if (role == null) {
            throw new RuntimeException("ROLE_USER not found");
        }
        return role;
    }
}
package com.announcementservice.announcement.announcement.repository;


import com.announcementservice.announcement.announcement.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByUserId(Long userId);
    List<Announcement> findByNameContainingIgnoreCase(String name);
}
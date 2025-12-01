package com.announcementservice.announcement.announcement.controller;


import com.announcementservice.announcement.announcement.dto.AnnouncementRequest;
import com.announcementservice.announcement.announcement.dto.AnnouncementResponse;
import com.announcementservice.announcement.announcement.entity.Announcement;
import com.announcementservice.announcement.announcement.service.AnnouncementService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {

    private static final Logger log = LoggerFactory.getLogger(AnnouncementController.class);
    @Autowired
    private AnnouncementService announcementService;

    @GetMapping
    public ResponseEntity<List<AnnouncementResponse>> getAllAnnouncements() {
        log.info("Start get all announcement");
        List<Announcement> announcements = announcementService.getAllAnnouncements();
        List<AnnouncementResponse> response = announcements.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnnouncementResponse> getAnnouncementById(@PathVariable Long id) {
        log.info("Start get all announcement by id: {}", id);
        return announcementService.getAnnouncementById(id)
                .map(announcement -> ResponseEntity.ok(convertToResponse(announcement)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AnnouncementResponse>> getAnnouncementsByUserId(@PathVariable Long userId) {
        log.info("Start get all announcement by UserId: {}", userId);
        List<Announcement> announcements = announcementService.getAnnouncementsByUserId(userId);
        List<AnnouncementResponse> response = announcements.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<List<AnnouncementResponse>> searchAnnouncements(@RequestParam String name) {
        log.info("Start search announcements by name: {}", name);
        List<Announcement> announcements = announcementService.searchAnnouncementsByName(name);
        List<AnnouncementResponse> response = announcements.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<AnnouncementResponse> createAnnouncement(@RequestBody AnnouncementRequest request) {
        log.info("Start create announcements: {}", request.toString());
        Announcement announcement = new Announcement();
        announcement.setUserId(request.getUserId());
        announcement.setName(request.getName());
        announcement.setDescription(request.getDescription());

        Announcement created = announcementService.createAnnouncement(announcement);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToResponse(created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnnouncementResponse> updateAnnouncement(
            @PathVariable Long id,
            @RequestBody AnnouncementRequest request) {
        log.info("Start update  announcement with id - {}, data : {}", id, request.toString());
        Announcement announcementDetails = new Announcement();
        announcementDetails.setUserId(request.getUserId());
        announcementDetails.setName(request.getName());
        announcementDetails.setDescription(request.getDescription());

        Announcement updated = announcementService.updateAnnouncement(id, announcementDetails);
        if (updated != null) {
            return ResponseEntity.ok(convertToResponse(updated));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnnouncement(@PathVariable Long id) {
        log.info("Start delete  announcement with id - {}", id);
        if (announcementService.deleteAnnouncement(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    private AnnouncementResponse convertToResponse(Announcement announcement) {
        return new AnnouncementResponse(
                announcement.getId(),
                announcement.getUserId(),
                announcement.getName(),
                announcement.getDescription()
        );
    }
}
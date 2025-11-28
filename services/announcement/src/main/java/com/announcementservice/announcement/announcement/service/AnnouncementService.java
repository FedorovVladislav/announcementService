package com.announcementservice.announcement.announcement.service;



import com.announcementservice.announcement.announcement.entity.Announcement;
import com.announcementservice.announcement.announcement.repository.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnnouncementService {

    @Autowired
    private AnnouncementRepository announcementRepository;

    public List<Announcement> getAllAnnouncements() {
        return announcementRepository.findAll();
    }

    public Optional<Announcement> getAnnouncementById(Long id) {
        return announcementRepository.findById(id);
    }

    public List<Announcement> getAnnouncementsByUserId(Long userId) {
        return announcementRepository.findByUserId(userId);
    }

    public List<Announcement> searchAnnouncementsByName(String name) {
        return announcementRepository.findByNameContainingIgnoreCase(name);
    }

    public Announcement createAnnouncement(Announcement announcement) {
        return announcementRepository.save(announcement);
    }

    public Announcement updateAnnouncement(Long id, Announcement announcementDetails) {
        Optional<Announcement> optionalAnnouncement = announcementRepository.findById(id);

        if (optionalAnnouncement.isPresent()) {
            Announcement announcement = optionalAnnouncement.get();
            announcement.setUserId(announcementDetails.getUserId());
            announcement.setName(announcementDetails.getName());
            announcement.setDescription(announcementDetails.getDescription());
            return announcementRepository.save(announcement);
        }

        return null;
    }

    public boolean deleteAnnouncement(Long id) {
        if (announcementRepository.existsById(id)) {
            announcementRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
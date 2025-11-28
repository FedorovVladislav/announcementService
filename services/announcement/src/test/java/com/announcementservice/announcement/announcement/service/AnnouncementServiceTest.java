package com.announcementservice.announcement.announcement.service;
import com.announcementservice.announcement.announcement.entity.Announcement;
import com.announcementservice.announcement.announcement.repository.AnnouncementRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AnnouncementServiceTest {

    @Mock
    private AnnouncementRepository announcementRepository;

    @InjectMocks
    private AnnouncementService announcementService;

    private Announcement announcement1;
    private Announcement announcement2;

    @BeforeEach
    void setUp() {
        announcement1 = new Announcement(1L, "Test Announcement 1", "Description 1");
        announcement1.setId(1L);

        announcement2 = new Announcement(2L, "Test Announcement 2", "Description 2");
        announcement2.setId(2L);
    }

    @Test
    void getAllAnnouncements_ShouldReturnAllAnnouncements() {
        // Arrange
        List<Announcement> expectedAnnouncements = Arrays.asList(announcement1, announcement2);
        when(announcementRepository.findAll()).thenReturn(expectedAnnouncements);

        // Act
        List<Announcement> result = announcementService.getAllAnnouncements();

        // Assert
        assertEquals(2, result.size());
        verify(announcementRepository, times(1)).findAll();
    }

    @Test
    void getAnnouncementById_WhenExists_ShouldReturnAnnouncement() {
        // Arrange
        when(announcementRepository.findById(1L)).thenReturn(Optional.of(announcement1));

        // Act
        Optional<Announcement> result = announcementService.getAnnouncementById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(announcement1.getId(), result.get().getId());
        verify(announcementRepository, times(1)).findById(1L);
    }

    @Test
    void getAnnouncementById_WhenNotExists_ShouldReturnEmpty() {
        // Arrange
        when(announcementRepository.findById(99L)).thenReturn(Optional.empty());

        // Act
        Optional<Announcement> result = announcementService.getAnnouncementById(99L);

        // Assert
        assertFalse(result.isPresent());
        verify(announcementRepository, times(1)).findById(99L);
    }

    @Test
    void createAnnouncement_ShouldSaveAndReturnAnnouncement() {
        // Arrange
        when(announcementRepository.save(any(Announcement.class))).thenReturn(announcement1);

        // Act
        Announcement result = announcementService.createAnnouncement(announcement1);

        // Assert
        assertNotNull(result);
        assertEquals(announcement1.getId(), result.getId());
        verify(announcementRepository, times(1)).save(announcement1);
    }

    @Test
    void updateAnnouncement_WhenExists_ShouldUpdateAndReturnAnnouncement() {
        // Arrange
        Announcement updatedDetails = new Announcement(1L, "Updated Name", "Updated Description");
        when(announcementRepository.findById(1L)).thenReturn(Optional.of(announcement1));
        when(announcementRepository.save(any(Announcement.class))).thenReturn(announcement1);

        // Act
        Announcement result = announcementService.updateAnnouncement(1L, updatedDetails);

        // Assert
        assertNotNull(result);
        verify(announcementRepository, times(1)).findById(1L);
        verify(announcementRepository, times(1)).save(announcement1);
    }

    @Test
    void updateAnnouncement_WhenNotExists_ShouldReturnNull() {
        // Arrange
        Announcement updatedDetails = new Announcement(1L, "Updated Name", "Updated Description");
        when(announcementRepository.findById(99L)).thenReturn(Optional.empty());

        // Act
        Announcement result = announcementService.updateAnnouncement(99L, updatedDetails);

        // Assert
        assertNull(result);
        verify(announcementRepository, times(1)).findById(99L);
        verify(announcementRepository, never()).save(any());
    }

    @Test
    void deleteAnnouncement_WhenExists_ShouldReturnTrue() {
        // Arrange
        when(announcementRepository.existsById(1L)).thenReturn(true);

        // Act
        boolean result = announcementService.deleteAnnouncement(1L);

        // Assert
        assertTrue(result);
        verify(announcementRepository, times(1)).existsById(1L);
        verify(announcementRepository, times(1)).deleteById(1L);
    }

    @Test
    void deleteAnnouncement_WhenNotExists_ShouldReturnFalse() {
        // Arrange
        when(announcementRepository.existsById(99L)).thenReturn(false);

        // Act
        boolean result = announcementService.deleteAnnouncement(99L);

        // Assert
        assertFalse(result);
        verify(announcementRepository, times(1)).existsById(99L);
        verify(announcementRepository, never()).deleteById(any());
    }
}
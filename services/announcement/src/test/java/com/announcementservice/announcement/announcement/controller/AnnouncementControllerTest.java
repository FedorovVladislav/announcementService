package com.announcementservice.announcement.announcement.controller;

import com.announcementservice.announcement.announcement.dto.AnnouncementRequest;
import com.announcementservice.announcement.announcement.entity.Announcement;
import com.announcementservice.announcement.announcement.service.AnnouncementService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AnnouncementController.class)
class AnnouncementControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private AnnouncementService announcementService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getAllAnnouncements_ShouldReturnAnnouncements() throws Exception {
        // Arrange
        Announcement announcement1 = new Announcement(1L, "Test 1", "Desc 1");
        announcement1.setId(1L);
        Announcement announcement2 = new Announcement(2L, "Test 2", "Desc 2");
        announcement2.setId(2L);

        List<Announcement> announcements = Arrays.asList(announcement1, announcement2);
        when(announcementService.getAllAnnouncements()).thenReturn(announcements);

        // Act & Assert
        mockMvc.perform(get("/api/announcements"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].name", is("Test 1")))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].name", is("Test 2")));

        verify(announcementService, times(1)).getAllAnnouncements();
    }

    @Test
    void getAnnouncementById_WhenExists_ShouldReturnAnnouncement() throws Exception {
        // Arrange
        Announcement announcement = new Announcement(1L, "Test", "Description");
        announcement.setId(1L);
        when(announcementService.getAnnouncementById(1L)).thenReturn(Optional.of(announcement));

        // Act & Assert
        mockMvc.perform(get("/api/announcements/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.userId", is(1)))
                .andExpect(jsonPath("$.name", is("Test")))
                .andExpect(jsonPath("$.description", is("Description")));

        verify(announcementService, times(1)).getAnnouncementById(1L);
    }

    @Test
    void getAnnouncementById_WhenNotExists_ShouldReturnNotFound() throws Exception {
        // Arrange
        when(announcementService.getAnnouncementById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        mockMvc.perform(get("/api/announcements/99"))
                .andExpect(status().isNotFound());

        verify(announcementService, times(1)).getAnnouncementById(99L);
    }

    @Test
    void createAnnouncement_ShouldReturnCreated() throws Exception {
        // Arrange
        AnnouncementRequest request = new AnnouncementRequest(1L, "New Announcement", "New Description");
        Announcement created = new Announcement(1L, "New Announcement", "New Description");
        created.setId(1L);

        when(announcementService.createAnnouncement(any(Announcement.class))).thenReturn(created);

        // Act & Assert
        mockMvc.perform(post("/api/announcements")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("New Announcement")))
                .andExpect(jsonPath("$.description", is("New Description")));

        verify(announcementService, times(1)).createAnnouncement(any(Announcement.class));
    }

    @Test
    void updateAnnouncement_WhenExists_ShouldReturnUpdated() throws Exception {
        // Arrange
        AnnouncementRequest request = new AnnouncementRequest(1L, "Updated Name", "Updated Description");
        Announcement updated = new Announcement(1L, "Updated Name", "Updated Description");
        updated.setId(1L);

        when(announcementService.updateAnnouncement(eq(1L), any(Announcement.class))).thenReturn(updated);

        // Act & Assert
        mockMvc.perform(put("/api/announcements/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("Updated Name")))
                .andExpect(jsonPath("$.description", is("Updated Description")));

        verify(announcementService, times(1)).updateAnnouncement(eq(1L), any(Announcement.class));
    }

    @Test
    void updateAnnouncement_WhenNotExists_ShouldReturnNotFound() throws Exception {
        // Arrange
        AnnouncementRequest request = new AnnouncementRequest(1L, "Updated Name", "Updated Description");
        when(announcementService.updateAnnouncement(eq(99L), any(Announcement.class))).thenReturn(null);

        // Act & Assert
        mockMvc.perform(put("/api/announcements/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound());

        verify(announcementService, times(1)).updateAnnouncement(eq(99L), any(Announcement.class));
    }

    @Test
    void deleteAnnouncement_WhenExists_ShouldReturnNoContent() throws Exception {
        // Arrange
        when(announcementService.deleteAnnouncement(1L)).thenReturn(true);

        // Act & Assert
        mockMvc.perform(delete("/api/announcements/1"))
                .andExpect(status().isNoContent());

        verify(announcementService, times(1)).deleteAnnouncement(1L);
    }

    @Test
    void deleteAnnouncement_WhenNotExists_ShouldReturnNotFound() throws Exception {
        // Arrange
        when(announcementService.deleteAnnouncement(99L)).thenReturn(false);

        // Act & Assert
        mockMvc.perform(delete("/api/announcements/99"))
                .andExpect(status().isNotFound());

        verify(announcementService, times(1)).deleteAnnouncement(99L);
    }
}
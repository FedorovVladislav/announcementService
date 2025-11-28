package com.announcementservice.announcement.announcement.dto;

public class AnnouncementRequest {

    private Long userId;
    private String name;
    private String description;

    // Конструкторы
    public AnnouncementRequest() {}

    public AnnouncementRequest(Long userId, String name, String description) {
        this.userId = userId;
        this.name = name;
        this.description = description;
    }

    // Геттеры и сеттеры
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

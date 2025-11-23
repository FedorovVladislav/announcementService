package com.announcementservice.authservice.exception;

public class ApiError extends RuntimeException {
    private String errorCode;
    private String description;

    public ApiError(String message) {
        super(message);
    }

    public ApiError(String errorCode, String description) {
        this.errorCode = errorCode;
        this.description = description;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

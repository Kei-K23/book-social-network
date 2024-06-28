package com.dev.kei.book.network.api.exception;

import org.springframework.http.HttpStatus;

public enum BusinessErrorCodes {

    NO_CODE(0, HttpStatus.NOT_IMPLEMENTED, "No code"),
    USER_NOT_FOUND(1000, HttpStatus.NOT_FOUND, "User not found"),
    INCORRECT_CURRENT_PASSWORD(1001, HttpStatus.BAD_REQUEST, "Incorrect current password"),
    INCORRECT_NEW_PASSWORD(1002, HttpStatus.BAD_REQUEST, "Incorrect new password"),
    ACCOUNT_LOCKED(1003, HttpStatus.FORBIDDEN, "User account is locked"),
    ACCOUNT_DISABLE(1004, HttpStatus.FORBIDDEN, "User account is not activated yet"),
    BAD_CREDENTIAL(1005, HttpStatus.FORBIDDEN, "User credentials are invalid"),
    INVALID_TOKEN(1006, HttpStatus.FORBIDDEN, "Receive invalid token to authenticate the user"),
    INTERNAL_SERVER_ERROR(1007, HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error"),
    ARGUMENT_INVALID(1008, HttpStatus.BAD_REQUEST, "Request arguments are invalid"),
    FORBIDDEN(1009, HttpStatus.FORBIDDEN, "User have no permission to perform task"),
    ;
    private final int code;
    private final HttpStatus httpStatus;
    private final String description;

    BusinessErrorCodes(int code, HttpStatus httpStatus, String description) {
        this.code = code;
        this.httpStatus = httpStatus;
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public int getCode() {
        return code;
    }

}

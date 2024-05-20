package com.socu.loginjwt.web.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.server.ResponseStatusException;

@Getter
public class ExceptionMessage extends ResponseStatusException {

    private final String message;

    public ExceptionMessage(HttpStatusCode status, String message) {
        super(status);
        this.message = message;
    }

    public ExceptionMessage(HttpStatus status, String message) {
        super(status);
        this.message = message;
    }

    public ExceptionMessage(String message) {
        super(HttpStatus.BAD_REQUEST);
        this.message = message;
    }
}

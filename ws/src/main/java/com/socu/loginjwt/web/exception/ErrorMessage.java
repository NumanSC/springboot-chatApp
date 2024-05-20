package com.socu.loginjwt.web.exception;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class ErrorMessage {
    private List<String> messages;
    private Date timestamp;
    private Integer status;
}

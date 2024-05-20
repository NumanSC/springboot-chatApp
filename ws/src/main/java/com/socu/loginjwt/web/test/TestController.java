package com.socu.loginjwt.web.test;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.socu.loginjwt.api.user.UserResponse;
import com.socu.loginjwt.domain.user.User;
import com.socu.loginjwt.web.user.UserMapper;

@RestController
@RequestMapping("/api/test")
public class TestController {
    @GetMapping
    public ResponseEntity<UserResponse> teste() {
        UserResponse response = UserMapper
                .toUserResponse((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        return ResponseEntity.ok(response);
    }

}

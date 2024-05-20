package com.socu.loginjwt.web.user;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.socu.loginjwt.api.user.UserRequest;
import com.socu.loginjwt.api.user.UserResponse;
import com.socu.loginjwt.domain.user.User;
import com.socu.loginjwt.domain.user.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    // @PostConstruct
    // public void init() {
    // System.out.println("UserController started");
    // UserRequest user = new UserRequest("numan", "123", "123");
    // UserResponse userResponse =
    // UserMapper.toUserResponse(userService.create(user));
    // System.out.println(userResponse);
    // }

    @PostMapping
    private ResponseEntity<UserResponse> create(@Valid @RequestBody UserRequest request) {
        UserResponse userResponse = UserMapper.toUserResponse(userService.create(request));

        return ResponseEntity.ok(userResponse);
    }

    // @GetMapping
    // private ResponseEntity<List> getAllUsers() {
    // return Resp2onseEntity.ok(userService.getAllUsers());
    // }
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        List<UserResponse> userResponses = users.stream().map(UserMapper::toUserResponse).collect(Collectors.toList());
        return ResponseEntity.ok(userResponses);
    }

    @PutMapping("/upload")
    public String uploadImage(@RequestParam("file") MultipartFile file) {

        UserResponse response = UserMapper
                .toUserResponse((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        System.out.println(response.id());
        try {
            byte[] bytes = file.getBytes();

            System.out.println(bytes);
            userService.saveImage(bytes, response.id());
            return "Dosya yüklendi: " + file.getOriginalFilename();
        } catch (IOException e) {
            e.printStackTrace();
            return "Dosya yüklenemedi";
        }
    }

}

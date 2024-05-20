package com.socu.loginjwt.web.user;

import java.util.List;

import com.socu.loginjwt.api.user.UserResponse;
import com.socu.loginjwt.domain.user.User;

public class UserMapper {
    public static UserResponse toUserResponse(User user) {
        return new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getImage());
    }

    public static List<UserResponse> toUserResponseList(List<User> users) {
        return users.stream().map(UserMapper::toUserResponse).toList();
    }
}

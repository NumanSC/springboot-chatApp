package com.socu.loginjwt.api.user;

import com.socu.loginjwt.domain.user.User;

public record UserResponse(Long id, String username, String email, byte[] image) {

}

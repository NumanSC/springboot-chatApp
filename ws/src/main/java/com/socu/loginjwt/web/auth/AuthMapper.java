package com.socu.loginjwt.web.auth;

import java.util.Map;

import com.socu.loginjwt.api.auth.AuthResponse;

public class AuthMapper {
    public static AuthResponse toAuthResponse(Map<String, String> auth) {
        return new AuthResponse(auth.get("token"), auth.get("refresh"));
    }
}

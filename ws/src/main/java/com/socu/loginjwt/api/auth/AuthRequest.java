package com.socu.loginjwt.api.auth;

import jakarta.validation.constraints.NotBlank;

public record AuthRequest(@NotBlank(message = "inform the username.") String username,
                @NotBlank(message = "inform the password.") String password) {
}

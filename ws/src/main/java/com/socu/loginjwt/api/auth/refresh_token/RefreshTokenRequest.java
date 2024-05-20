package com.socu.loginjwt.api.auth.refresh_token;

import jakarta.validation.constraints.NotBlank;

public record RefreshTokenRequest(@NotBlank(message = "inform the token.") String token) {
}

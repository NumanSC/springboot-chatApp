package com.socu.loginjwt.api.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record UserRequest(
                @NotBlank(message = "inform the username.") String username,
                @NotBlank(message = "inform the email.") @Email String email,
                @NotBlank(message = "inform the password.") String password, byte[] image) {
}

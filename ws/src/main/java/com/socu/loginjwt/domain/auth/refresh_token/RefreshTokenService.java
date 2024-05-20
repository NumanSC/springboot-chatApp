package com.socu.loginjwt.domain.auth.refresh_token;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.socu.loginjwt.domain.user.User;
import com.socu.loginjwt.domain.user.UserService;
import com.socu.loginjwt.web.exception.ExceptionMessage;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserService userService;

    @Value("${api.security.token.refresh.expiration-seconds}")
    private Long tokenRefreshExpirationSeconds;

    public RefreshToken createRefreshToken(String username) {
        RefreshToken refreshToken = RefreshToken.builder()
                .user((User) userService.loadUserByUsername(username))
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusSeconds(tokenRefreshExpirationSeconds)) // set expiry of refresh token to
                                                                                      // 10 minutes - you can configure
                                                                                      // it application.properties file
                .build();
        return refreshTokenRepository.save(refreshToken);
    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new ExceptionMessage(HttpStatus.UNAUTHORIZED, "refresh token is expired. Please make a new login..!");
        }
        return token;
    }

}

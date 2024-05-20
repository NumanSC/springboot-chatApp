package com.socu.loginjwt.domain.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.socu.loginjwt.domain.user.User;
import com.socu.loginjwt.web.exception.ExceptionMessage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.ZoneId;

@Component
public class JwtService {
    @Value("${api.security.token.secret}")
    private String secret;
    @Value("${api.security.token.zone}")
    private String zone;
    @Value("${api.security.token.expiration-seconds}")
    private Long tokenExpirationSeconds;

    public String generateToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create().withIssuer("auth-api")
                    .withSubject(user.getUsername())
                    .withExpiresAt(genExpiratedDate())
                    .sign(algorithm);
            return token;
        } catch (JWTCreationException e) {
            e.printStackTrace();
            throw new ExceptionMessage(HttpStatus.BAD_REQUEST, "error with generation token");
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("auth-api")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException e) {
            throw new ExceptionMessage(HttpStatus.UNAUTHORIZED, "error with validation token");
        }
    }

    private Instant genExpiratedDate() {
        ZoneId zoneId = ZoneId.of(zone);
        Instant expiratedDate = Instant.now().plusSeconds(tokenExpirationSeconds).atZone(zoneId).toInstant();
        return expiratedDate;
    }
}

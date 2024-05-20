package com.socu.loginjwt.config.auth;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.socu.loginjwt.domain.auth.JwtService;
import com.socu.loginjwt.domain.user.UserService;

import java.io.IOException;

@RequiredArgsConstructor
@Component
public class FilterChain extends OncePerRequestFilter {
    private final JwtService tokenService;
    private final UserService usersService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
            jakarta.servlet.FilterChain filterChain) throws ServletException, IOException {
        var token = this.recoverToken(request);
        if (token != null) {
            var userName = tokenService.validateToken(token);
            UserDetails user = usersService.loadUserByUsername(userName);

            var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            System.out.println("authentication: " + authentication.getPrincipal());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null)
            return null;
        return authHeader.replace("Bearer ", "");
    }
}

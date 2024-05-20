package com.socu.loginjwt.domain.auth.refresh_token;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

import com.socu.loginjwt.domain.user.User;

@Entity
@Table(name = "refresh_token")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column(unique = true)
    private String token;

    @Column
    private Instant expiryDate;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}

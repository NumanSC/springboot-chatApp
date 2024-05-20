package com.socu.loginjwt.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    UserDetails findByUsername(String username);

    List<User> findByUsernameOrEmail(String username, String email);

    Optional<User> findById(Long userId);

    ;

    @Query("SELECT u FROM User u")
    List<User> getAllUsers();

}

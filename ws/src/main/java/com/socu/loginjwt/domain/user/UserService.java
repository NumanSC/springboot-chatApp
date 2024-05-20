package com.socu.loginjwt.domain.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.socu.loginjwt.api.user.UserRequest;

import com.socu.loginjwt.web.exception.ExceptionMessage;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    public User create(UserRequest request) {

        List<User> user = userRepository.findByUsernameOrEmail(request.username(), request.email());

        if (user.size() > 0)
            throw new ExceptionMessage(HttpStatus.BAD_REQUEST, "username or e-mail in use.");
        String password = new BCryptPasswordEncoder().encode(request.password());

        User userToSave = new User(null, request.username(), request.email(), password, request.image());

        System.out.println("userToSave: " + userToSave.getAuthorities());
        return userRepository.save(userToSave);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username);
    }

    public User findById(Long userId) {

        return userRepository.findById(userId).orElse(null);
    }

    public List<User> getAllUsers() {
        return userRepository.getAllUsers();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public void saveImage(byte[] bytes, Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        user.setImage(bytes);
        userRepository.save(user);
    }

    // public void saveImage(byte[] bytes, Long id) {
    // User user = userRepository.findById(id);
    // user.setImage(bytes);
    // userRepository.save(user);
    // }

}

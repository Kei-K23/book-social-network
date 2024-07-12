package com.dev.kei.book.network.api.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public User save(User user) {
        return userRepository.save(user);
    }

    public UserResponse getLoginUser(Authentication authentication) {
        // Get authenticated user
        User user = (User) authentication.getPrincipal();

        if (user == null) {
            throw new BadCredentialsException("User cannot get from JWT token");
        }
        return userMapper.toUserResponse(user);
    }

    public UserResponse updateLoginUser(UserRequest request, Authentication authentication) {
        // Get authenticated user
        User user = (User) authentication.getPrincipal();

        if (user == null) {
            throw new BadCredentialsException("User cannot get from JWT token");
        }
        // Update user properties
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        return userMapper.toUserResponse(userRepository.save(user));
    }

    public void deleteLoginUser(Authentication authentication) {
        // Get authenticated user
        User user = (User) authentication.getPrincipal();

        if (user == null) {
            throw new BadCredentialsException("User cannot get from JWT token");
        }
        userRepository.deleteById(user.getId());
    }
}

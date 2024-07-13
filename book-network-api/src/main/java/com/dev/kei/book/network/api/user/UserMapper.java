package com.dev.kei.book.network.api.user;

import com.dev.kei.book.network.api.file.FileUtils;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {
    public UserResponse toUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .bio(user.getBio())
                .profilePicture(FileUtils.readFileFromLocation(user.getProfilePicture()))
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}

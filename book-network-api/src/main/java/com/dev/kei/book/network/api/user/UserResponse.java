package com.dev.kei.book.network.api.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String bio;
    private byte[] profilePicture;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String updatedJWT;
}

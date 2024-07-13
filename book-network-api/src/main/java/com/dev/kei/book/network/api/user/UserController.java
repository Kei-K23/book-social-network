package com.dev.kei.book.network.api.user;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@Tag(name = "Users")
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getLoginUser(
            Authentication authentication
    ) {
        return ResponseEntity.ok(userService.getLoginUser(authentication));
    }

    @GetMapping( "/{user-id}")
    public ResponseEntity<UserResponse> getUserById(
            @PathVariable("user-id") Long userId
    ) {
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateLoginUser(
            @RequestBody @Valid UserRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(userService.updateLoginUser(request, authentication));
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteLoginUser(
            Authentication authentication
    ) {
        userService.deleteLoginUser(authentication);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/me/profile-upload", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadProfilePicture(
            @Parameter()
            @RequestPart(name = "file")
            MultipartFile file,
            Authentication authentication
    ) {
        userService.uploadProfilePicture(file, authentication);
        return ResponseEntity.accepted().build();
    }
}

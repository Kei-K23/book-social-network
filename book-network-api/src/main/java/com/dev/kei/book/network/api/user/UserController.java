package com.dev.kei.book.network.api.user;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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
}

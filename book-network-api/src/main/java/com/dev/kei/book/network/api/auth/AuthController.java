package com.dev.kei.book.network.api.auth;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@Tag(name = "Authentication")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> register(@RequestBody @Valid AuthRegisterRequest request) throws MessagingException {
        authService.register(request);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthLoginRequest request) throws MessagingException {
        return ResponseEntity.status(HttpStatus.OK).body(authService.login(request));
    }
}

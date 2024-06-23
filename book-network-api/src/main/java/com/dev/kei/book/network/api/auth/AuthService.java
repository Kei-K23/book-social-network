package com.dev.kei.book.network.api.auth;

import com.dev.kei.book.network.api.email.EmailService;
import com.dev.kei.book.network.api.email.EmailTemplateName;
import com.dev.kei.book.network.api.jwt.Token;
import com.dev.kei.book.network.api.jwt.TokenRepository;
import com.dev.kei.book.network.api.role.Role;
import com.dev.kei.book.network.api.role.RoleService;
import com.dev.kei.book.network.api.security.JwtService;
import com.dev.kei.book.network.api.user.User;
import com.dev.kei.book.network.api.user.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final JwtService jwtService;
    private final EmailService emailService;
    private final AuthenticationManager authenticationManager;

    @Value("${application.security.jwt.account-activation-url}")
    private String accountActivationUrl;

    @Transactional
    public void register(AuthRegisterRequest request) throws MessagingException {
        // Implement error handle logic
        Role userRole = roleService.findByName("USER");

        // Build user object
        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(List.of(userRole))
                .build();

        // Save user to database
        userRepository.save(user);
        // Send user account validation email
        sendValidationEmail(user);
    }

    @Transactional
    public AuthResponse login(AuthLoginRequest request) {
        Map<String, Object> claims = new HashMap<>();

        // Authenticate user
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = ((User) auth.getPrincipal());

        // Add login user fullName to claim to use in token
        claims.put("fullName", user.getFullName());

        // Generate token
        String token = jwtService.generateToken(claims, user);

        // Build and return auth response
        return AuthResponse.builder()
                .token(token)
                .build();
    }

    public void accountActivate(String token) throws MessagingException {
        Token savedToken = tokenRepository.findByToken(token).orElseThrow(() -> new RuntimeException("Invalid token"));
        User user = savedToken.getUser();

        // If token is expired, re-send the email
        if (LocalDateTime.now().isAfter(savedToken.getExpiredAt())) {
            sendValidationEmail(user);
            throw new RuntimeException("Token expired! We re-send the account activation code to your email.");
        }

        // Activate user
        user.setEnabled(true);
        userRepository.save(user);

        // Validate token
        savedToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(savedToken);
    }

    private void sendValidationEmail(User user) throws MessagingException {
        String token = generateAndSaveActivationToken(user);

        // Send email
        emailService.sendEmail(
                user.getEmail(),
                "Account activation",
                user.getUsername(),
                EmailTemplateName.ACCOUNT_ACTIVATION,
                accountActivationUrl,
                token
        );
    }

    // Generate and save activation token
    private String generateAndSaveActivationToken(User user) {
        String token = generateActivationToken(6);

        // Token save to database
        tokenRepository.save(Token.builder()
                .user(user)
                .token(token)
                .createdAt(LocalDateTime.now())
                .expiredAt(LocalDateTime.now().plusMinutes(10))
                .user(user)
                .build());

        return token;
    }

    // Generate random characters code for user account activation
    private String generateActivationToken(int length) {
        // Characters set
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();
        // Random characters
        for (int i = 0; i < length; i++) {
            int index = secureRandom.nextInt(characters.length());
            sb.append(characters.charAt(index));
        }
        return sb.toString();
    }
}

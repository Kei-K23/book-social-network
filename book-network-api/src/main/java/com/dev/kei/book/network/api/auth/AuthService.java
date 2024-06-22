package com.dev.kei.book.network.api.auth;

import com.dev.kei.book.network.api.email.EmailService;
import com.dev.kei.book.network.api.email.EmailTemplateName;
import com.dev.kei.book.network.api.jwt.Token;
import com.dev.kei.book.network.api.jwt.TokenService;
import com.dev.kei.book.network.api.role.Role;
import com.dev.kei.book.network.api.role.RoleService;
import com.dev.kei.book.network.api.user.User;
import com.dev.kei.book.network.api.user.UserService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final TokenService tokenService;
    private final EmailService emailService;
    @Value("${application.security.jwt.account-activation-url}")
    private String accountActivationUrl;

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
        userService.save(user);
        // Send user account validation email
        sendValidationEmail(user);
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
        tokenService.save(Token.builder()
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

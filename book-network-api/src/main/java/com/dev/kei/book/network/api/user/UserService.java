package com.dev.kei.book.network.api.user;

import com.dev.kei.book.network.api.book.Book;
import com.dev.kei.book.network.api.book.BookRepository;
import com.dev.kei.book.network.api.file.FileStorageService;
import com.dev.kei.book.network.api.file.FileUtils;
import com.dev.kei.book.network.api.security.JwtService;
import com.dev.kei.book.network.api.transactionHistory.BookTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final FileStorageService fileStorageService;
    private final BookRepository bookRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;


    public User save(User user) {
        return userRepository.save(user);
    }

    public UserResponse getLoginUser(Authentication authentication) {
        // Get authenticated user
        User user = (User) authentication.getPrincipal();

        if (user == null) {
            throw new BadCredentialsException("User cannot get from JWT token");
        }
        // Get all books that created by current login user
        List<Book> books = bookRepository.findAllBooksByOwnerId(user.getId());
        user.setBooks(books);

        return userMapper.toUserResponse(user);
    }

    public UserResponse updateLoginUser(UserRequest request, Authentication authentication) {
        Map<String, Object> claims = new HashMap<>();
        UserResponse userResponse = new UserResponse();

        // Get authenticated user
        User user = (User) authentication.getPrincipal();

        if (user == null) {
            throw new BadCredentialsException("Cannot get user from JWT token");
        }
        // Update user properties
        user.setId(request.getId());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setBio(request.getBio());

        // If user email and password are changed, generate jwt token again
        if (!Objects.equals(user.getEmail(), request.getEmail()) ||
                !Objects.equals(user.getPassword(), request.getPassword())) {
            // Update the email
            if (!Objects.equals(user.getEmail(), request.getEmail())) {
                user.setEmail(request.getEmail());
            }
            // Update the password
            if (!Objects.equals(user.getPassword(), request.getPassword())) {
                user.setPassword(passwordEncoder.encode(request.getPassword()));
            }

            // Add login user fullName to claim to use in token
            claims.put("fullName", user.getFullName());
            claims.put("userId", user.getId());

            // Generate new token with user updated information
            String token = jwtService.generateToken(claims, user);
            userResponse.setUpdatedJWT(token);
        }

        // If profile picture exist in request
        if (request.getProfilePicture() != null) {
            String filename = FileUtils.getFilePathFromBytes(request.getProfilePicture(), ".jpg");

            if (filename != null) {
                user.setProfilePicture(filename);
            }
        }

        // Map from user to user response
        userResponse.setId(user.getId());
        userResponse.setFirstName(user.getFirstName());
        userResponse.setLastName(user.getLastName());
        userResponse.setBio(user.getBio());
        userResponse.setEmail(user.getEmail());
        userResponse.setCreatedAt(user.getCreatedAt());
        userResponse.setUpdatedAt(user.getUpdatedAt());

        // Save user data changes
        userRepository.save(user);
        // Return user response payload
        return userResponse;
    }

    public void deleteLoginUser(Authentication authentication) {
        // Get authenticated user
        User user = (User) authentication.getPrincipal();

        if (user == null) {
            throw new BadCredentialsException("User cannot get from JWT token");
        }
        userRepository.deleteById(user.getId());
    }


    public void uploadProfilePicture(MultipartFile file, Authentication authentication) {
        // Get authenticated user
        User user = (User) authentication.getPrincipal();
        if (user == null) {
            throw new BadCredentialsException("User cannot get from JWT token");
        }

        // Save image to file system
        var profileImageFile = fileStorageService.saveFile(file, user.getId());

        // Save user profile image to database
        user.setProfilePicture(profileImageFile);
        userRepository.save(user);
    }
}

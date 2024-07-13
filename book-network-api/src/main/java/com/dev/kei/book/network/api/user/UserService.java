package com.dev.kei.book.network.api.user;

import com.dev.kei.book.network.api.book.Book;
import com.dev.kei.book.network.api.book.BookRepository;
import com.dev.kei.book.network.api.file.FileStorageService;
import com.dev.kei.book.network.api.file.FileUtils;
import com.dev.kei.book.network.api.transactionHistory.BookTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final FileStorageService fileStorageService;
    private final BookRepository bookRepository;
    private final BookTransactionRepository bookTransactionRepository;

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
        // Get authenticated user
        User user = (User) authentication.getPrincipal();

        if (user == null) {
            throw new BadCredentialsException("User cannot get from JWT token");
        }
        // Update user properties
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setBio(request.getBio());
        user.setPassword(request.getPassword());

        // If profile picture exist in request
        if (request.getProfilePicture() != null) {
            String filename = FileUtils.getFilePathFromBytes(request.getProfilePicture(), ".jpg");

            if (filename != null) {
                user.setProfilePicture(filename);
            }
        }
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

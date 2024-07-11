package com.dev.kei.book.network.api.favorite;

import com.dev.kei.book.network.api.book.Book;
import com.dev.kei.book.network.api.book.BookRepository;
import com.dev.kei.book.network.api.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;
    private final BookRepository bookRepository;

    public Long save(Long bookId, Authentication authentication) {
        // Get authenticated user
        User user = (User) authentication.getPrincipal();
        // Find book to update shareable status
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + bookId + " to make favorite"));

        // Check user is already favorite the book
        Favorite existingFavorite = favoriteRepository.findByBookIdAndUserId(book.getId(), user.getId());

        if (existingFavorite != null) {
            throw new IllegalArgumentException("This book already exists in your favorite list");
        }
        // Build favorite object to store in database
        Favorite favorite = Favorite.builder()
                .book(book)
                .user(user)
                .build();

        // Save in db
        return favoriteRepository.save(favorite).getId();
    }
}

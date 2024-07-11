package com.dev.kei.book.network.api.favorite;

import com.dev.kei.book.network.api.book.Book;
import com.dev.kei.book.network.api.book.BookRepository;
import com.dev.kei.book.network.api.book.BookTransactionResponse;
import com.dev.kei.book.network.api.common.PageResponse;
import com.dev.kei.book.network.api.transactionHistory.BookTransactionHistory;
import com.dev.kei.book.network.api.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;
    private final BookRepository bookRepository;
    private final FavoriteMapper favoriteMapper;

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

    public void delete(Long id) {
        // Find favorite book to update shareable status
        Optional<Favorite> favorite = favoriteRepository.findById(id);

        if (favorite.isEmpty()) {
            throw new IllegalArgumentException("This book in not your favorite list");
        }

        // Delete the favorite book
        favoriteRepository.deleteById(id);
    }

    public PageResponse<FavoriteResponse> getAllFavoriteBooksByUser(int page, int size, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Favorite> favorites = favoriteRepository
                .findAllFavoriteBooksByUser(pageable, user.getId());

        // Map to favorite lists to favorite response
        List<FavoriteResponse> favoriteResponses = favorites.stream()
                .map(favoriteMapper::toFavoriteResponse).toList();

        // Return PageResponse for favorite response
        return new PageResponse<>(
                favoriteResponses,
                favorites.getNumber(),
                favorites.getSize(),
                favorites.getTotalElements(),
                favorites.getTotalPages(),
                favorites.isFirst(),
                favorites.isLast());
    }
}

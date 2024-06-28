package com.dev.kei.book.network.api.book;

import com.dev.kei.book.network.api.common.PageResponse;
import com.dev.kei.book.network.api.exceptionHandler.OperationNotPermittedException;
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
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final BookMapper bookMapper;

    public Long save(BookRequest request, Authentication authentication) {
        // Get authenticated user from request authentication context
        User user = (User) authentication.getPrincipal();
        // Map from BookRequest to Book
        Book book = bookMapper.toBook(request);
        book.setOwner(user);

        // Save book to database and return created id
        return bookRepository.save(book).getId();
    }

    public BookResponse getBookById(Long bookId) {
        // Find book by book id
        return bookRepository.findById(bookId)
                .map(bookMapper::toBookResponse)
                .orElseThrow(
                () -> new EntityNotFoundException("Book not found with id: " + bookId)
        );
    }

    public PageResponse<BookResponse> getAllBooks(int page, int size, Authentication authentication) {
        // Get user data from request
        User user = (User) authentication.getPrincipal();
        // Make pageable object
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Book> books = bookRepository.findAllDisplayableBooks(pageable, user.getId());

        // Map to book lists to BookResponse
        List<BookResponse> bookResponses = books.stream().map(bookMapper::toBookResponse).toList();

        // Return PageResponse for book response
        return new PageResponse<>(
                bookResponses,
                books.getNumber(),
                books.getSize(),
                books.getTotalElements(),
                books.getTotalPages(),
                books.isFirst(),
                books.isLast()
        );
    }

    public PageResponse<BookResponse> getAllBooksByOwner(int page, int size, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Book> books = bookRepository.findAll(BookSpecification.withOwnerId(user.getId()), pageable);

        // Map to book lists to BookResponse
        List<BookResponse> bookResponses = books.stream().map(bookMapper::toBookResponse).toList();

        // Return PageResponse for book response
        return new PageResponse<>(
                bookResponses,
                books.getNumber(),
                books.getSize(),
                books.getTotalElements(),
                books.getTotalPages(),
                books.isFirst(),
                books.isLast()
        );
    }

    public Long updateShareableStatus(Long bookId, Authentication authentication) {
        // Get authenticated user
        User user = (User) authentication.getPrincipal();
        // Find book to update shareable status
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + bookId + " to update"));

        // Check book is owned by authenticated user
        if (!Objects.equals(book.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("User can only update shareable status of their own book");
        }

        // Update shareable status to database
        book.setShareable(!book.isShareable());
        // Return updated book id
        return bookRepository.save(book).getId();
    }

    public Long updateArchivedStatus(Long bookId, Authentication authentication) {
        // Get authenticated user
        User user = (User) authentication.getPrincipal();
        // Find book to update archived status
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + bookId + " to update"));

        // Check book is owned by authenticated user
        if (!Objects.equals(book.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("User can only update archived status of their own book");
        }

        // Update archived status to database
        book.setArchived(!book.isArchived());
        // Return updated book id
        return bookRepository.save(book).getId();
    }
}

package com.dev.kei.book.network.api.book;

import com.dev.kei.book.network.api.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final BookMapper bookMapper;
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
}

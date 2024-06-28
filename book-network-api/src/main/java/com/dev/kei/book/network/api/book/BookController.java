package com.dev.kei.book.network.api.book;

import com.dev.kei.book.network.api.common.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("books")
@RequiredArgsConstructor
@Tag(name = "Books")
public class BookController {
    private final BookService bookService;

    @PostMapping
    public ResponseEntity<Long> save(
            @Valid @RequestBody BookRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(bookService.save(request, authentication));
    }

    @GetMapping("/{book-id}")
    public ResponseEntity<BookResponse> getBookById(
            @PathVariable("book-id") Long bookId
    ) {
        return ResponseEntity.ok(bookService.getBookById(bookId));
    }

    @GetMapping
    public ResponseEntity<PageResponse<BookResponse>> getAllBooks(
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "0", required = false) int size,
            Authentication authentication
    ) {
        return ResponseEntity.ok(bookService.getAllBooks(page, size, authentication));
    }
}

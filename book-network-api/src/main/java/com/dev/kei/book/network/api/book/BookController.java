package com.dev.kei.book.network.api.book;

import com.dev.kei.book.network.api.common.PageResponse;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
        return ResponseEntity.status(HttpStatus.CREATED).body(bookService.save(request, authentication));
    }

    @PostMapping("/borrow/{book-id}")
    public ResponseEntity<Long> borrowBook(
            @PathVariable("book-id") Long bookId,
            Authentication authentication
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bookService.borrowBook(bookId, authentication));
    }

    @PostMapping("/borrow/return/{book-id}")
    public ResponseEntity<Long> returnBorrowedBook(
            @PathVariable("book-id") Long bookId,
            Authentication authentication
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(bookService.returnBorrowedBook(bookId, authentication));
    }

    @PostMapping("/borrow/return/approve/{book-id}")
    public ResponseEntity<Long> approveReturnedBorrowedBook(
            @PathVariable("book-id") Long bookId,
            Authentication authentication
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(bookService.approveReturnedBorrowedBook(bookId, authentication));
    }

    @GetMapping("/{book-id}")
    public ResponseEntity<BookResponse> getBookById(
            @PathVariable("book-id") Long bookId
    ) {
        return ResponseEntity.ok(bookService.getBookById(bookId));
    }

    @GetMapping( "/search")
    public ResponseEntity<PageResponse<BookResponse>> getBookByName(
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "0", required = false) int size,
            @RequestParam(value = "book-name", required = true, defaultValue = "") String name
    ) {
        return ResponseEntity.ok(bookService.getBookByName(name, page, size));
    }

    @DeleteMapping("/{book-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBookById(
            @PathVariable("book-id") Long bookId,
            Authentication authentication
    ) {
        bookService.deleteBookById(bookId, authentication);
    }

    @GetMapping
    public ResponseEntity<PageResponse<BookResponse>> getAllBooks(
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "0", required = false) int size,
            Authentication authentication
    ) {
        return ResponseEntity.ok(bookService.getAllBooks(page, size, authentication));
    }

    @GetMapping("/owner")
    public ResponseEntity<PageResponse<BookResponse>> getAllBooksByOwner(
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "0", required = false) int size,
            Authentication authentication
    ) {
        return ResponseEntity.ok(bookService.getAllBooksByOwner(page, size, authentication));
    }

    @GetMapping("/owner/{owner-id}")
    public ResponseEntity<PageResponse<BookResponse>> getAllBooksByOwnerId(
            @PathParam(value = "owner-id") Long ownerId,
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "0", required = false) int size
    ) {
        return ResponseEntity.ok(bookService.getAllBooksByOwnerId(ownerId, page, size));
    }

    @GetMapping("/borrowed")
    public ResponseEntity<PageResponse<BookTransactionResponse>> getAllBorrowedBooksByOwner(
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "0", required = false) int size,
            Authentication authentication
    ) {
        return ResponseEntity.ok(bookService.getAllBorrowedBooksByOwner(page, size, authentication));
    }

    @GetMapping("/returned")
    public ResponseEntity<PageResponse<BookTransactionResponse>> getAllReturnedBooksByOwner(
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "0", required = false) int size,
            Authentication authentication
    ) {
        return ResponseEntity.ok(bookService.getAllReturnedBooksByOwner(page, size, authentication));
    }

    @PatchMapping("/shareable/{book-id}")
    public ResponseEntity<Long> updateShareableStatus(
            @PathVariable("book-id") Long bookId,
            Authentication authentication
    ) {
        return ResponseEntity.ok(bookService.updateShareableStatus(bookId, authentication));
    }

    @PatchMapping("/archived/{book-id}")
    public ResponseEntity<Long> updateArchivedStatus(
            @PathVariable("book-id") Long bookId,
            Authentication authentication
    ) {
        return ResponseEntity.ok(bookService.updateArchivedStatus(bookId, authentication));
    }

    @PostMapping(value = "/cover/{book-id}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadBookCover(
            @PathVariable(name = "book-id") Long bookId,
            @Parameter()
            @RequestPart(name = "file")
            MultipartFile file,
            Authentication authentication
    ) {
        bookService.uploadBookCover(bookId, file, authentication);
        return ResponseEntity.accepted().build();
    }
}

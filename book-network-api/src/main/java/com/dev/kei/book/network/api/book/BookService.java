package com.dev.kei.book.network.api.book;

import com.dev.kei.book.network.api.common.PageResponse;
import com.dev.kei.book.network.api.exceptionHandler.OperationNotPermittedException;
import com.dev.kei.book.network.api.file.FileStorageService;
import com.dev.kei.book.network.api.file.FileUtils;
import com.dev.kei.book.network.api.transactionHistory.BookTransactionHistory;
import com.dev.kei.book.network.api.transactionHistory.BookTransactionRepository;
import com.dev.kei.book.network.api.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final BookMapper bookMapper;
    private final BookTransactionRepository bookTransactionRepository;
    private final FileStorageService fileStorageService;

    public Long save(BookRequest request, Authentication authentication) {
        // Get authenticated user from request authentication context
        User user = (User) authentication.getPrincipal();

        // Map from BookRequest to Book
        Book book = bookMapper.toBook(request);
        book.setOwner(user);

        if (request.getCoverImg() != null) {
            String filename = FileUtils.getFilePathFromBytes(request.getCoverImg(), ".jpg");

            if (filename != null) {
                book.setCoverImage(filename);
            }
        }
        // Save book to database and return created id
        return bookRepository.save(book).getId();
    }

    public BookResponse getBookById(Long bookId) {
        // Find book by book id
        return bookRepository.findById(bookId)
                .map(bookMapper::toBookResponse)
                .orElseThrow(
                        () -> new EntityNotFoundException("Book not found with id: " + bookId));
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
                books.isLast());
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
                books.isLast());
    }

    public Long updateShareableStatus(Long bookId, Authentication authentication) {
        // Get authenticated user
        User user = (User) authentication.getPrincipal();
        // Find book to update shareable status
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + bookId + " to update"));

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
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + bookId + " to update"));

        // Check book is owned by authenticated user
        if (!Objects.equals(book.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("User can only update archived status of their own book");
        }

        // Update archived status to database
        book.setArchived(!book.isArchived());
        // Return updated book id
        return bookRepository.save(book).getId();
    }

    public PageResponse<BookTransactionResponse> getAllBorrowedBooksByOwner(int page, int size,
            Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<BookTransactionHistory> bookTransactionHistories = bookTransactionRepository
                .findAllBorrowedBooksByUserId(pageable, user.getId());

        // Map to book transaction lists to book transaction response
        List<BookTransactionResponse> bookTransactionResponses = bookTransactionHistories.stream()
                .map(bookMapper::toBookTransactionResponse).toList();

        // Return PageResponse for book transaction response
        return new PageResponse<>(
                bookTransactionResponses,
                bookTransactionHistories.getNumber(),
                bookTransactionHistories.getSize(),
                bookTransactionHistories.getTotalElements(),
                bookTransactionHistories.getTotalPages(),
                bookTransactionHistories.isFirst(),
                bookTransactionHistories.isLast());
    }

    public PageResponse<BookTransactionResponse> getAllReturnedBooksByOwner(int page, int size,
            Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<BookTransactionHistory> bookTransactionHistories = bookTransactionRepository
                .findAllReturnedBooksByUserId(pageable, user.getId());

        // Map to book transaction lists to book transaction response
        List<BookTransactionResponse> bookTransactionResponses = bookTransactionHistories.stream()
                .map(bookMapper::toBookTransactionResponse).toList();

        // Return PageResponse for book transaction response
        return new PageResponse<>(
                bookTransactionResponses,
                bookTransactionHistories.getNumber(),
                bookTransactionHistories.getSize(),
                bookTransactionHistories.getTotalElements(),
                bookTransactionHistories.getTotalPages(),
                bookTransactionHistories.isFirst(),
                bookTransactionHistories.isLast());
    }

    public Long borrowBook(Long bookId, Authentication authentication) {
        // Get authenticated user
        User user = (User) authentication.getPrincipal();
        // Find book to borrow
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + bookId + " to borrow"));

        // Check the book is archived or not shareable
        if (book.isArchived() || !book.isShareable()) {
            throw new OperationNotPermittedException(
                    "The requested book cannot be borrowed since it is archived or not shareable");
        }

        // Check book is owned by authenticated user
        if (Objects.equals(book.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("User can not borrow your own book");
        }

        // Check user already borrowed the book
        boolean isAlreadyBorrowed = bookTransactionRepository.isAlreadyBorrowedByUser(bookId, user.getId());
        if (isAlreadyBorrowed) {
            throw new OperationNotPermittedException("User already borrowed this book");
        }

        // Check other your borrowed the book
        boolean isAlreadyBorrowedByOtherUser = bookTransactionRepository.isAlreadyBorrowedByOtherUser(bookId);
        if (isAlreadyBorrowedByOtherUser) {
            throw new OperationNotPermittedException("User already borrowed this book");
        }

        // Save book transaction history as borrowed book to database
        BookTransactionHistory bookTransactionHistory = BookTransactionHistory.builder()
                .book(book)
                .user(user)
                .returnApprove(false)
                .returned(false)
                .build();

        // Return saved book transaction history id
        return bookTransactionRepository.save(bookTransactionHistory).getId();
    }

    public Long returnBorrowedBook(Long bookId, Authentication authentication) {
        // Get authenticated user
        User user = (User) authentication.getPrincipal();
        // Find book to return
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + bookId + " to return"));

        // Check book is owned by authenticated user
        if (Objects.equals(book.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("User can not return their own book");
        }

        // Check user actually borrowed the book
        Optional<BookTransactionHistory> bookTransactionHistory = bookTransactionRepository
                .findByBookIdAndUserId(bookId, user.getId());
        if (bookTransactionHistory.isEmpty()) {
            throw new OperationNotPermittedException("User did not borrow this book");
        }

        // Update book transaction history returned status to true
        bookTransactionHistory.get().setReturned(true);
        // Return book transaction history id
        return bookTransactionRepository.save(bookTransactionHistory.get()).getId();
    }

    public Long approveReturnedBorrowedBook(Long bookId, Authentication authentication) {
        // Get authenticated user
        User user = (User) authentication.getPrincipal();
        // Find book to return
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + bookId + " to return"));

        // Check book is owned by authenticated user
        if (!Objects.equals(book.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("User can approve their own book");
        }

        // Check user actually borrowed the book
        Optional<BookTransactionHistory> bookTransactionHistory = bookTransactionRepository
                .findByBookIdAndOwnerId(bookId, user.getId());
        if (bookTransactionHistory.isEmpty()) {
            throw new OperationNotPermittedException("The book is not returned yet. You cannot approve its");
        }

        // Update book transaction history returned status to true
        bookTransactionHistory.get().setReturnApprove(true);
        // Return book transaction history id
        return bookTransactionRepository.save(bookTransactionHistory.get()).getId();
    }

    public void uploadBookCover(Long bookId, MultipartFile file, Authentication authentication) {
        // Get authenticated user
        User user = (User) authentication.getPrincipal();
        // Find book to return
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + bookId));

        // Check book is owned by authenticated user
        if (!Objects.equals(book.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("Cannot upload cover image for other user's book");
        }

        // Save image to file system
        var coverImageFile = fileStorageService.saveFile(file, user.getId());

        // Save book cover image to database
        book.setCoverImage(coverImageFile);
        bookRepository.save(book);
    }

    public void deleteBookById(Long bookId, Authentication authentication) {
        var book = this.bookRepository.findById(bookId).orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + bookId));
        User user = (User) authentication.getPrincipal();

        // Check the book own by auth user
        if (!Objects.equals(book.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("Cannot delete book that own by other user's");
        }
        // Delete the book
        this.bookRepository.delete(book);
    }

    public PageResponse<BookResponse> getBookByName(String name, int page, int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Book> bookTransactionHistories = bookRepository
                .findAllBookByName(pageable, name);

        // Map to book transaction lists to book transaction response
        List<BookResponse> bookResponses = bookTransactionHistories.stream()
                .map(bookMapper::toBookResponse).toList();

        // Return PageResponse for book transaction response
        return new PageResponse<>(
                bookResponses,
                bookTransactionHistories.getNumber(),
                bookTransactionHistories.getSize(),
                bookTransactionHistories.getTotalElements(),
                bookTransactionHistories.getTotalPages(),
                bookTransactionHistories.isFirst(),
                bookTransactionHistories.isLast());
    }
}

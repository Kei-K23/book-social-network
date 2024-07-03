package com.dev.kei.book.network.api.feedback;

import com.dev.kei.book.network.api.book.Book;
import com.dev.kei.book.network.api.book.BookRepository;
import com.dev.kei.book.network.api.exceptionHandler.OperationNotPermittedException;
import com.dev.kei.book.network.api.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FeedbackService {
    private final BookRepository bookRepository;
    private final FeedbackRepository feedbackRepository;

    public Long save(FeedbackRequest request, Authentication authentication) {
        // Find the book to give feedback
        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + request.getBookId()));

        // Check the book is archived or not shareable
        if (book.isArchived() || !book.isShareable()) {
            throw new OperationNotPermittedException("Cannot give feedback for archived or non-shareable book");
        }

        // Get user
        User user = (User) authentication.getPrincipal();

        // Check user can not give feedback for their own book
        if (Objects.equals(book.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("User can not give feedback for their own book");
        }

        // Map from FeedbackRequest to Feedback
        Feedback feedback = FeedbackMapper.toFeedback(request);

        // Save feedback to database and return created id
        return feedbackRepository.save(feedback).getId();
    }
}

package com.dev.kei.book.network.api.feedback;

import com.dev.kei.book.network.api.book.Book;
import com.dev.kei.book.network.api.book.BookRepository;
import com.dev.kei.book.network.api.common.PageResponse;
import com.dev.kei.book.network.api.exceptionHandler.OperationNotPermittedException;
import com.dev.kei.book.network.api.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public PageResponse<FeedbackResponse> getAllFeedbacksByBookId(Long bookId, int page, int size, Authentication authentication) {
        // Create pageable pagination
        Pageable pageable = PageRequest.of(page, size);

        // Get user
        User user = (User) authentication.getPrincipal();

        // Find all feedbacks by book id
        Page<Feedback> feedbacks = feedbackRepository.findAllByBookId(bookId, pageable);
        // Map from feedbacks to feedback responses
        List<FeedbackResponse> feedbackResponses = feedbacks.stream().map(feedback -> FeedbackMapper.toFeedbackResponse(feedback, user.getId())).toList();

        // Return page response
        return new PageResponse<>(
                feedbackResponses,
                feedbacks.getNumber(),
                feedbacks.getSize(),
                feedbacks.getTotalElements(),
                feedbacks.getTotalPages(),
                feedbacks.isFirst(),
                feedbacks.isLast()
        );
    }

    public Long updateComment(Long feedbackId, FeedBackCommentUpdateRequest request, Authentication authentication) {
        // Check feedback exist or not
        Feedback feedback = feedbackRepository.findById(feedbackId).orElseThrow(() -> new EntityNotFoundException("Feedback not found with id: " + feedbackId));

        // Get user
        User user = (User) authentication.getPrincipal();

        // Check feedback is created by login user
        if (!Objects.equals(feedback.getCreatedBy(), user.getId())) {
            throw new OperationNotPermittedException("User can only update comment of their own feedback");
        }
        // Update comment
        feedback.setComment(request.getComment());
        // Save changes to database and return updated id
        return feedbackRepository.save(feedback).getId();
    }
}

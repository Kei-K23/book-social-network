package com.dev.kei.book.network.api.feedback;

import com.dev.kei.book.network.api.common.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("feedbacks")
@RequiredArgsConstructor
@Tag(name = "Feedbacks")
public class FeedbackController {
    private final FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<Long> save(
            @Valid @RequestBody FeedbackRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(feedbackService.save(request, authentication));
    }

    @GetMapping("/book/{book-id}")
    public ResponseEntity<PageResponse<FeedbackResponse>> getAllFeedbacksByBookId(
            @PathVariable("book-id") Long bookId,
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "10", required = false) int size,
            Authentication authentication
    ) {
        return ResponseEntity.ok(feedbackService.getAllFeedbacksByBookId(bookId, page, size, authentication));
    }
}

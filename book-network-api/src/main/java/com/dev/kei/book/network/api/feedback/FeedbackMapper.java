package com.dev.kei.book.network.api.feedback;

import com.dev.kei.book.network.api.book.Book;

import java.util.Objects;

public class FeedbackMapper {

    public static Feedback toFeedback(FeedbackRequest feedbackRequest) {
        return Feedback.builder()
                .rate(feedbackRequest.getRate())
                .comment(feedbackRequest.getComment())
                .book(Book.builder()
                        .id(feedbackRequest.getBookId())
                        .build())
                .build();
    }

    public static FeedbackResponse toFeedbackResponse(Feedback feedback, Long userId) {
        return FeedbackResponse.builder()
                .rate(feedback.getRate())
                .comment(feedback.getComment())
                .ownFeedback(Objects.equals(feedback.getCreatedBy(), userId))
                .build();
    }
}

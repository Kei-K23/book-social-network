package com.dev.kei.book.network.api.feedback;

import com.dev.kei.book.network.api.book.Book;

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
}

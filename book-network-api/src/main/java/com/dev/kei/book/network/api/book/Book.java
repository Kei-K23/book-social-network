package com.dev.kei.book.network.api.book;

import com.dev.kei.book.network.api.common.BaseEntity;
import com.dev.kei.book.network.api.feedback.Feedback;
import com.dev.kei.book.network.api.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import com.dev.kei.book.network.api.transactionHistory.BookTransactionHistory;

import java.util.List;

@SuperBuilder
@Data
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_books")
public class Book extends BaseEntity {
    private String title;
    private String author;
    private String isbn;
    private String synopsis;
    private String coverImage;
    private boolean archived;
    private boolean shareable;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "book")
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "book")
    private List<BookTransactionHistory> bookTransitionHistories;

    @Transient
    public double getRates() {
        // Check feedback have in this book
        if (feedbacks == null || feedbacks.isEmpty()) {
            return 0.0;
        }
        
        // Calculate rates
        var rates = feedbacks.stream().mapToDouble(Feedback::getRate).average().orElse(0.0);
        return Math.round(rates * 10.0) / 10.0;
    }
}

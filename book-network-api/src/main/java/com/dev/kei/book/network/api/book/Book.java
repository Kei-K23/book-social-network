package com.dev.kei.book.network.api.book;

import com.dev.kei.book.network.api.common.BaseEntity;
import com.dev.kei.book.network.api.feedback.Feedback;
import com.dev.kei.book.network.api.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import com.dev.kei.book.network.api.transitionHistory.BookTransitionHistory;

import java.util.List;

@SuperBuilder
@Data
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
    private List<BookTransitionHistory> bookTransitionHistories;
}

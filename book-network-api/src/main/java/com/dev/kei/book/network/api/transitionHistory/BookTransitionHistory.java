package com.dev.kei.book.network.api.transitionHistory;

import com.dev.kei.book.network.api.book.Book;
import com.dev.kei.book.network.api.common.BaseEntity;
import com.dev.kei.book.network.api.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_book_transition_history")
public class BookTransitionHistory extends BaseEntity {
    // User relations here
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    private boolean returned;
    private boolean returnApprove;
}

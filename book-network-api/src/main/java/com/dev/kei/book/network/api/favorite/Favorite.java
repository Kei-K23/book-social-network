package com.dev.kei.book.network.api.favorite;

import com.dev.kei.book.network.api.book.Book;
import com.dev.kei.book.network.api.common.BaseEntity;
import com.dev.kei.book.network.api.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_favorites")
public class Favorite extends BaseEntity {
    private Long bookId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;
}

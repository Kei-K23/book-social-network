package com.dev.kei.book.network.api.feedback;

import com.dev.kei.book.network.api.book.Book;
import com.dev.kei.book.network.api.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_feedback")
public class Feedback extends BaseEntity {
    private Double rate;
    private String comment;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;
}

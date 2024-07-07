package com.dev.kei.book.network.api.book;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookTransactionResponse {
    private Long id;
    private String title;
    private String author;
    private String isbn;
    private String owner;
    private byte[] coverImage;
    private double rate;
    private boolean returned;
    private boolean returnApprove;
}

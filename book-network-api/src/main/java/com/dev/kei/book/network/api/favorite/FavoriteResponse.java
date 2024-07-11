package com.dev.kei.book.network.api.favorite;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteResponse {
    private Long id;
    private String title;
    private String author;
    private String isbn;
    private Long bookId;
    private String owner;
    private byte[] coverImage;
    private double rate;
}

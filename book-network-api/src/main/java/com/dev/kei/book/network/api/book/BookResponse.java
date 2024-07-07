package com.dev.kei.book.network.api.book;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookResponse {
    private Long id;
    private String title;
    private String author;
    private String isbn;
    private String synopsis;
    private byte[] coverImage;
    private boolean archived;
    private boolean shareable;
    private String owner;
    private Long ownerId;
    private double rate;
}

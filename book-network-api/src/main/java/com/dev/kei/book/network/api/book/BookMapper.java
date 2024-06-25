package com.dev.kei.book.network.api.book;

import org.springframework.stereotype.Service;

@Service
public class BookMapper {
    public Book toBook(BookRequest request) {
        return Book.builder()
                .title(request.getTitle())
                .author(request.getAuthor())
                .isbn(request.getIsbn())
                .shareable(request.isShareable())
                .synopsis(request.getSynopsis())
                .archived(false)
                .build();
    }
}

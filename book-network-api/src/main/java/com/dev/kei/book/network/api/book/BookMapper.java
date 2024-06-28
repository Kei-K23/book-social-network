package com.dev.kei.book.network.api.book;

import com.dev.kei.book.network.api.transactionHistory.BookTransactionHistory;
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

    public BookResponse toBookResponse(Book book) {
        return BookResponse.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .isbn(book.getIsbn())
                .shareable(book.isShareable())
                .synopsis(book.getSynopsis())
                .archived(book.isArchived())
                .owner(book.getOwner().getFullName())
                .rate(book.getRates())
                .build();
    }

    public BookTransactionResponse toBookTransactionResponse(BookTransactionHistory bookTransactionHistory) {
        return BookTransactionResponse.builder()
                .id(bookTransactionHistory.getBook().getId())
                .title(bookTransactionHistory.getBook().getTitle())
                .author(bookTransactionHistory.getBook().getAuthor())
                .isbn(bookTransactionHistory.getBook().getIsbn())
                .rate(bookTransactionHistory.getBook().getRates())
                .returned(bookTransactionHistory.isReturned())
                .returnApprove(bookTransactionHistory.isReturnApprove())
                .build();
    }
}

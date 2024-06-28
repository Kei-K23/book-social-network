package com.dev.kei.book.network.api.book;

import org.springframework.data.jpa.domain.Specification;

public class BookSpecification {

    // Query specification for filtering books by owner id
    public static Specification<Book> withOwnerId(Long ownerId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("owner").get("id"), ownerId);
    }
}

package com.dev.kei.book.network.api.book;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    @Query(
            """
                SELECT b
                FROM Book b
                WHERE b.archived = false
                AND b.shareable = true
            """
    )
    Page<Book> findAllDisplayableBooks(Pageable pageable, Long userId);

    Page<Book> findAll(Specification<Book> bookSpecification, Pageable pageable);

    Page findbyName(String name);
}

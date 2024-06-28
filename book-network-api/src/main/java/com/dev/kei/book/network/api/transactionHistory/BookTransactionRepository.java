package com.dev.kei.book.network.api.transactionHistory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookTransactionRepository extends JpaRepository<BookTransactionHistory, Long> {
    @Query(
            """
            SELECT bh
            FROM BookTransactionHistory bh
            WHERE bh.user.id = :userId
            """
    )
    Page<BookTransactionHistory> findAllBorrowedBooksByUserId(Pageable pageable, Long userId);

    @Query(
            """
            SELECT bh
            FROM BookTransactionHistory bh
            WHERE bh.book.owner.id = :userId
            """
    )
    Page<BookTransactionHistory> findAllReturnedBooksByUserId(Pageable pageable, Long userId);

    @Query(
            """
            SELECT (COUNT (*) > 0) AS is_borrowed
            FROM BookTransactionHistory bh
            WHERE bh.book.id = :bookId
            AND bh.user.id = :id
            AND bh.returnApprove = false
            """
    )
    boolean isAlreadyBorrowedByUser(@Param("bookId") Long bookId, @Param("userId") Long userId);

    @Query(
            """
            SELECT (COUNT (*) > 0) AS is_borrowed
            FROM BookTransactionHistory bh
            WHERE bh.book.id = :bookId
            AND bh.returnApprove = false
            """
    )
    boolean isAlreadyBorrowedByOtherUser(@Param("bookId") Long bookId);

    @Query(
            """
            SELECT bh
            FROM BookTransactionHistory bh
            WHERE bh.book.id = :bookId
            AND bh.user.id = :userId
            AND bh.returned = false
            AND bh.returnApprove = false
            """
    )
    Optional<BookTransactionHistory> findByBookIdAndUserId(@Param("bookId") Long bookId, @Param("userId") Long userId);

    @Query(
            """
            SELECT bh
            FROM BookTransactionHistory bh
            WHERE bh.book.id = :bookId
            AND bh.user.id = :userId
            AND bh.returned = true
            AND bh.returnApprove = false
            """
    )
    Optional<BookTransactionHistory> findReturnedBookByBookIdAndUserId(@Param("bookId") Long bookId, @Param("userId") Long userId);
}

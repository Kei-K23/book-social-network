package com.dev.kei.book.network.api.transactionHistory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

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
}

package com.dev.kei.book.network.api.favorite;

import com.dev.kei.book.network.api.transactionHistory.BookTransactionHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    @Query(
            """
            SELECT f
            FROM Favorite f
            WHERE f.book.id = :bookId
            AND f.user.id = :userId
            """
    )
    Favorite findByBookIdAndUserId(@Param("bookId") Long bookId, @Param("userId") Long userId);

    @Query(
            """
            SELECT f
            FROM Favorite f
            WHERE f.user.id = :userId
            """
    )
    Page<Favorite> findAllFavoriteBooksByUser(Pageable pageable, @Param("userId") Long userId);
}

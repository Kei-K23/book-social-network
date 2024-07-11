package com.dev.kei.book.network.api.favorite;

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
}

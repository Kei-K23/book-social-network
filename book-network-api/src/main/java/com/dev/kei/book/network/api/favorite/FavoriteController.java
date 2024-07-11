package com.dev.kei.book.network.api.favorite;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("favorites")
@RequiredArgsConstructor
@Tag(name = "Favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    @PostMapping("/{book-id}")
    public ResponseEntity<Long> save(
            @PathVariable("book-id") Long bookId,
            Authentication authentication) {

        return  ResponseEntity.status(HttpStatus.CREATED)
                .body(favoriteService.save(bookId, authentication));
    }
}

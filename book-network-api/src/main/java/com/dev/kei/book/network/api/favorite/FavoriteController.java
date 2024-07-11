package com.dev.kei.book.network.api.favorite;

import com.dev.kei.book.network.api.common.PageResponse;
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

    @GetMapping
    public ResponseEntity<PageResponse<FavoriteResponse>> getAllFavoriteBooksByUser(
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "0", required = false) int size,
            Authentication authentication
    ) {
        return ResponseEntity.ok(favoriteService.getAllFavoriteBooksByUser(page, size, authentication));
    }

    @PostMapping("/{book-id}")
    public ResponseEntity<Long> save(
            @PathVariable("book-id") Long bookId,
            Authentication authentication) {

        return  ResponseEntity.status(HttpStatus.CREATED)
                .body(favoriteService.save(bookId, authentication));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(
            @PathVariable("id") Long id
    ) {
        favoriteService.delete(id);
        return  ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}

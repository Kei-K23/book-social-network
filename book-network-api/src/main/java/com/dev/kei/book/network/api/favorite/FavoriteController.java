package com.dev.kei.book.network.api.favorite;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("favorites")
@RequiredArgsConstructor
@Tag(name = "Favorites")
public class FavoriteController {
    private final FavoriteService favoriteService;
}

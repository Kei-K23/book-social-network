package com.dev.kei.book.network.api.favorite;

import com.dev.kei.book.network.api.file.FileUtils;
import org.springframework.stereotype.Service;

@Service
public class FavoriteMapper {
    public FavoriteResponse toFavoriteResponse(Favorite favorite) {
        return FavoriteResponse.builder()
                .id(favorite.getId())
                .title(favorite.getBook().getTitle())
                .author(favorite.getBook().getAuthor())
                .rate(favorite.getBook().getRates())
                .owner(favorite.getBook().getOwner().getFullName())
                .isbn(favorite.getBook().getIsbn())
                .bookId(favorite.getBook().getId())
                .coverImage(FileUtils.readFileFromLocation(favorite.getBook().getCoverImage()))
                .build();
    }
}

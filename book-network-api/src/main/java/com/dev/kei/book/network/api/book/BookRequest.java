package com.dev.kei.book.network.api.book;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class BookRequest {
    private Long id;
    @NotNull(message = "Title cannot be null")
    @NotBlank(message = "Title cannot be blank")
    private String title;
    @NotNull(message = "Author cannot be null")
    @NotBlank(message = "Author cannot be blank")
    private String author;
    @NotNull(message = "ISBN cannot be null")
    @NotBlank(message = "ISBN cannot be blank")
    private String isbn;
    @NotNull(message = "Synopsis cannot be null")
    @NotBlank(message = "Synopsis cannot be blank")
    private String synopsis;
    private boolean shareable;
    private byte[] coverImg;
}

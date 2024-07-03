package com.dev.kei.book.network.api.feedback;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedBackCommentUpdateRequest {
    @NotBlank(message = "203")
    @NotNull(message = "203")
    @NotEmpty(message = "203")
    private String comment;
}

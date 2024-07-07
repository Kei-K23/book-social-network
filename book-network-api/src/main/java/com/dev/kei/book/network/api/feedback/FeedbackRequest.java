package com.dev.kei.book.network.api.feedback;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackRequest {
    private Long id;
    @Positive(message = "201")
    @Min(value = 0, message = "202")
    @Max(value = 5, message = "202")
    private Double rate;
    @NotBlank(message = "203")
    @NotNull(message = "203")
    @NotEmpty(message = "203")
    private String comment;
    @NotNull(message = "204")
    private Long bookId;
}

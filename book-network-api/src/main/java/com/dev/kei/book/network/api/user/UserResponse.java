package com.dev.kei.book.network.api.user;

import com.dev.kei.book.network.api.book.Book;
import com.dev.kei.book.network.api.role.Role;
import com.dev.kei.book.network.api.transactionHistory.BookTransactionHistory;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String bio;
    private byte[] profilePicture;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

package com.dev.kei.book.network.api.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final TokenRepository tokenRepository;

    public Token save(Token token) {
        return tokenRepository.save(token);
    }
}

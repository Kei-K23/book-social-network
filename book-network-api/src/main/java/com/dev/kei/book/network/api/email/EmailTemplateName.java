package com.dev.kei.book.network.api.email;

import lombok.Getter;

@Getter
public enum EmailTemplateName {
    ACCOUNT_ACTIVATION("account_activation");

    private final String name;

    EmailTemplateName(String name) {
        this.name = name;
    }
}

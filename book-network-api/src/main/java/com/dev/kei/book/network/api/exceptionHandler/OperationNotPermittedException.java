package com.dev.kei.book.network.api.exceptionHandler;

public class OperationNotPermittedException extends RuntimeException {
    public OperationNotPermittedException() {}

    public OperationNotPermittedException(String s) {
        super(s);
    }
}

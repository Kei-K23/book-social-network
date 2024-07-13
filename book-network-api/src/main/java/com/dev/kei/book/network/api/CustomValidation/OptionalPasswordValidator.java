package com.dev.kei.book.network.api.CustomValidation;

import com.dev.kei.book.network.api.CustomAnnotation.OptionalPassword;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class OptionalPasswordValidator implements ConstraintValidator<OptionalPassword, String> {

    @Override
    public void initialize(OptionalPassword constraintAnnotation) {
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        if (password == null || password.isEmpty()) {
            return true; // Password is optional
        }
        return password.length() >= 8; // Password must be at least 8 characters long
    }
}

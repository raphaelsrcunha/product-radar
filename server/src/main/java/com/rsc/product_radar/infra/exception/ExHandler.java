package com.rsc.product_radar.infra.exception;

import com.rsc.product_radar.domain.ExceptionValidation;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity error404Handler() {

        return ResponseEntity.notFound().build();

    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity error400Handler(MethodArgumentNotValidException ex) {

        var errors = ex.getFieldErrors();

        return ResponseEntity.badRequest().body(errors.stream().map(errorValidationData::new).toList());

    }

    @ExceptionHandler(ExceptionValidation.class)
    public ResponseEntity handleBusinessRuleErrors(ExceptionValidation ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    private record errorValidationData(String field, String message) {

        private errorValidationData(FieldError error){
            this(error.getField(), error.getDefaultMessage());
        }

    }

}

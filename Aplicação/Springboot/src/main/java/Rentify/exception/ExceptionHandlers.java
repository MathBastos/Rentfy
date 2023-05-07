package rentify.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.stream.Collectors;

@ControllerAdvice
public class ExceptionHandlers {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationException(MethodArgumentNotValidException ex) {
        var error = ex.getBindingResult()
                .getAllErrors()
                .stream()
                .map(v -> String.format("'%s' %s",
                        ((FieldError) v).getField(),
                        v.getDefaultMessage())
                ).collect(Collectors.joining(", "));
        return ResponseEntity.badRequest().body(error);
    }
}

package com.puc.project.rentify.controllers;

import com.puc.project.rentify.config.AuthenticationService;
import com.puc.project.rentify.model.AuthenticationRequest;
import com.puc.project.rentify.model.AuthenticationResponse;
import com.puc.project.rentify.model.Exceptions;
import com.puc.project.rentify.model.RegisterRequest;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Autenticação", description = "API Autenticação contendo todos os processos relacionado.")
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) throws Exceptions.IdAlreadyUsed, ExecutionException, InterruptedException, Exceptions.IdNotFound, Exceptions.UsernameAlreadyUsed {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody AuthenticationRequest request
    ) throws Exceptions.IdNotFound, ExecutionException, InterruptedException {
        System.out.println(request);
        return ResponseEntity.ok(service.authenticate(request));
    }
}

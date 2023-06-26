package com.puc.project.rentify.controller;

import com.puc.project.rentify.model.AuthRequest;
import com.puc.project.rentify.model.AuthResponse;
import com.puc.project.rentify.service.AuthenticationService;
import com.puc.project.rentify.model.UsuarioRegistro;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Autenticação", description = "API Autenticação contendo todos os processos relacionado.")
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/register")
    @Operation(summary = "Criar Usuário do sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuário Criado"),
            @ApiResponse(responseCode = "500", description = "Erro interno")
    })
    public ResponseEntity<AuthResponse> register(
            @RequestBody UsuarioRegistro request
    ) {
        try {
            return ResponseEntity.ok(service.register(request));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/authenticate")
    @Operation(summary = "Autenticar o Usuário no sistema e gerar o Token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuário autenticado e token gerado"),
            @ApiResponse(responseCode = "500", description = "Erro interno")
    })
    public ResponseEntity<AuthResponse> register(
            @RequestBody AuthRequest request
    ) {
        try {
            return ResponseEntity.ok(service.authenticate(request));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

package com.puc.project.rentify.controllers;

import com.puc.project.rentify.model.Usuario;
import com.puc.project.rentify.model.Exceptions.*;
import com.puc.project.rentify.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/usuarios")
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Usuário", description = "API Usuário contendo todos os processos relacionado.")
public class UsuarioController {
    @Autowired
    private UsuarioRepository repository;

    @Operation(summary = "Listar Usuários")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Listagem de Usuários")
    })
    @GetMapping("/listar")
    @ResponseStatus(HttpStatus.OK)
    public List<Usuario> listar() throws InterruptedException, ExecutionException {
        return repository.listar();
    }

    @Operation(summary = "Listar Usuário por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuário do respectivo ID"),
            @ApiResponse(responseCode = "404", description = "ID não encontrado", content = @Content)
    })
    @GetMapping("/listar_id")
    @ResponseStatus(HttpStatus.OK)
    public Usuario listar(@RequestParam String id) throws InterruptedException, ExecutionException {
        try {
            return repository.listar(id);
        } catch (IdNotFound e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage()
            );
        }
    }

    @Operation(summary = "Criar Usuário")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Usuário criada", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = Usuario.class))}),
            @ApiResponse(responseCode = "400", description = "ID ou Usuário já está em uso", content = @Content)
    })
    @PostMapping("/adicionar")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> adicionar(@RequestBody Usuario obj) throws InterruptedException, ExecutionException {
        try {
            repository.adicionar(obj);
            Map new_response = new HashMap<>();
            new_response.put("status", 200);
            new_response.put("message", "Criado");
            return new_response;
        } catch (IdAlreadyUsed e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, e.getMessage()
            );
        } catch (UsernameAlreadyUsed e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, e.getMessage()
            );
        }catch (IdNotFound e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, e.getMessage()
            );
        }
    }

    @Operation(summary = "Alterar Usuário pelo ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuário alterada", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = Usuario.class))}),
            @ApiResponse(responseCode = "404", description = "ID não encontrado", content = @Content)
    })
    @PutMapping("/alterar")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, String> alterar(@RequestBody Usuario obj) throws InterruptedException, ExecutionException {
        try {
            repository.alterar(obj);
            Map new_response = new HashMap<>();
            new_response.put("status", 200);
            new_response.put("message", "Alterado");
            return new_response;
        } catch (IdNotFound e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage()
            );
        }
    }

    @Operation(summary = "Deletar Usuário por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuário deletada"),
            @ApiResponse(responseCode = "400", description = "ID sendo usado em Tabelas Estrangeiras", content = @Content)
    })
    @DeleteMapping("/deletar")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, String> deletar(@RequestParam String id) throws InterruptedException, ExecutionException {
        try {
            repository.deletar(id);
            Map new_response = new HashMap<>();
            new_response.put("status", 200);
            new_response.put("message", "Deletado");
            return new_response;
        } catch (IdNotFound e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage()
            );
        } catch (IdInForeignObject e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, e.getMessage()
            );
        }
    }
}

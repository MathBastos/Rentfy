package com.puc.project.rentify.controllers;

import com.puc.project.rentify.model.Especificacao;
import com.puc.project.rentify.model.Exceptions.*;
import com.puc.project.rentify.repository.EspecificacaoRepository;
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
@RequestMapping("/especificacoes")
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Especificação", description = "API Especificação contendo todos os processos relacionado.")
public class EspecificacaoController {
    @Autowired
    private EspecificacaoRepository repository;

    @Operation(summary = "Listar Especificações")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Listagem de Especificações")
    })
    @GetMapping("/listar")
    @ResponseStatus(HttpStatus.OK)
    public List<Especificacao> listar() throws InterruptedException, ExecutionException {
        return repository.listar();
    }

    @Operation(summary = "Listar Especificação por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Especificação do respectivo ID"),
            @ApiResponse(responseCode = "404", description = "ID não encontrado", content = @Content)
    })
    @GetMapping("/listar_id")
    @ResponseStatus(HttpStatus.OK)
    public Especificacao listar(@RequestParam String id) throws InterruptedException, ExecutionException {
        try {
            return repository.listar(id);
        } catch (IdNotFound e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage()
            );
        }
    }

    @Operation(summary = "Criar Especificação")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Especificação criada", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = Especificacao.class))}),
            @ApiResponse(responseCode = "400", description = "ID já está em uso", content = @Content)
    })
    @PostMapping("/adicionar")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> adicionar(@RequestBody Especificacao obj) throws InterruptedException, ExecutionException {
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
        }
    }

    @Operation(summary = "Alterar Especificação pelo ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Especificação alterada", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = Especificacao.class))}),
            @ApiResponse(responseCode = "404", description = "ID não encontrado", content = @Content)
    })
    @PutMapping("/alterar")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, String> alterar(@RequestBody Especificacao obj) throws InterruptedException, ExecutionException {
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

    @Operation(summary = "Deletar Especificação por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Especificação deletada"),
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

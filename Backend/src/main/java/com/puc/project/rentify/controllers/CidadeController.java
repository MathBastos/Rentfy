package com.puc.project.rentify.controllers;

import com.puc.project.rentify.model.Cidade;
import com.puc.project.rentify.model.Exceptions.*;
import com.puc.project.rentify.repository.CidadeRepository;
import io.swagger.annotations.Api;
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
@RequestMapping("/cidades")
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Cidade", description = "API Cidade contendo todos os processos relacionado.")
public class CidadeController {
    @Autowired
    private CidadeRepository repository;

    @Operation(summary = "Listar Cidades")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Listagem de Cidades")
    })
    @GetMapping("/listar")
    @ResponseStatus(HttpStatus.OK)
    public List<Cidade> listar() throws InterruptedException, ExecutionException {
        return repository.listar();
    }

    @Operation(summary = "Listar Cidade por ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Cidade do respectivo ID"),
        @ApiResponse(responseCode = "404", description = "ID não encontrado", content = @Content)
    })
    @GetMapping("/listar_id")
    @ResponseStatus(HttpStatus.OK)
    public Cidade listar(@RequestParam String id) throws InterruptedException, ExecutionException {
        try {
            return repository.listar(id);
        } catch (IdNotFound e) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, e.getMessage()
            );
        }
    }

    @Operation(summary = "Criar Cidade")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Cidade criada", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = Cidade.class))}),
            @ApiResponse(responseCode = "400", description = "ID já está em uso", content = @Content)
    })
    @PostMapping("/adicionar")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> adicionar(@RequestBody Cidade obj) throws InterruptedException, ExecutionException {
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

    @Operation(summary = "Alterar Cidade pelo ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cidade alterada", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = Cidade.class))}),
            @ApiResponse(responseCode = "404", description = "ID não encontrado", content = @Content)
    })
    @PutMapping("/alterar")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, String> alterar(@RequestBody Cidade obj) throws InterruptedException, ExecutionException {
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

    @Operation(summary = "Deletar Cidade por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cidade deletada"),
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

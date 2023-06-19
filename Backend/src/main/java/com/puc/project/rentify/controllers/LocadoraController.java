package com.puc.project.rentify.controllers;

import com.puc.project.rentify.model.Locadora;
import com.puc.project.rentify.model.JoinLocadora;
import com.puc.project.rentify.model.Exceptions.*;
import com.puc.project.rentify.repository.LocadoraRepository;
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

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/locadoras")
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Locadora", description = "API Locadora contendo todos os processos relacionado.")
public class LocadoraController {

    @Autowired
    private LocadoraRepository repository;

    @Operation(summary = "Listar Locadoras")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Listagem de Locadoras")
    })
    @GetMapping("/listar")
    @ResponseStatus(HttpStatus.OK)
    public List<Locadora> listar() throws InterruptedException, ExecutionException {
        return repository.listar();
    }

    @Operation(summary = "Listagem de Locadoras com joins")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Listagem de Locadoras com joins")
    })
    @GetMapping("/listar_join")
    @ResponseStatus(HttpStatus.OK)
    public List<JoinLocadora> listar_join() throws IdNotFound, InterruptedException, ExecutionException {
        return repository.listar_join();
    }

    @Operation(summary = "Listar Locadora por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Locadora do respectivo ID"),
            @ApiResponse(responseCode = "404", description = "ID não encontrado", content = @Content)
    })
    @GetMapping("/listar_id")
    @ResponseStatus(HttpStatus.OK)
    public Locadora listar(@RequestParam String id) throws InterruptedException, ExecutionException {
        try {
            return repository.listar(id);
        } catch (IdNotFound e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage()
            );
        }
    }

    @Operation(summary = "Listar Locadora por ID com joins")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Locadora do respectivo ID com joins."),
            @ApiResponse(responseCode = "404", description = "ID não encontrado", content = @Content)
    })
    @GetMapping("/listar_join_id")
    @ResponseStatus(HttpStatus.OK)
    public JoinLocadora listar_join(@RequestParam String id) throws InterruptedException, ExecutionException {
        try {
            return repository.listar_join(id);
        } catch (IdNotFound e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage()
            );
        }
    }

    @Operation(summary = "Criar Locadora")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Locadora criado", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = Locadora.class))}),
            @ApiResponse(responseCode = "400", description = "ID já está em uso", content = @Content),
            @ApiResponse(responseCode = "404", description = "ID Estrangeiro não encontrado", content = @Content)
    })
    @PostMapping("/adicionar")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> adicionar(@RequestBody Locadora obj) throws InterruptedException, ExecutionException {
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
        } catch (ForeignIdNotExists e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage()
            );
        }
    }

    @Operation(summary = "Alterar Locadora pelo ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Locadora alterado", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = Locadora.class))}),
            @ApiResponse(responseCode = "404", description = "ID / ID Estrangeiro não encontrado", content = @Content)
    })
    @PutMapping("/alterar")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, String> alterar(@RequestBody Locadora obj) throws InterruptedException, ExecutionException {
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
        } catch (ForeignIdNotExists e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage()
            );
        }
    }

    @Operation(summary = "Deletar Locadora por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Locadora deletada"),
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

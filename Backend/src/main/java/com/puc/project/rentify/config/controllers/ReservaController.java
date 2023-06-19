package com.puc.project.rentify.config.controllers;

import com.puc.project.rentify.model.JoinReserva;
import com.puc.project.rentify.model.Reserva;
import com.puc.project.rentify.model.Exceptions.*;
import com.puc.project.rentify.repository.ReservaRepository;
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
@RequestMapping("/reservas")
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Reserva", description = "API Reserva contendo todos os processos relacionado.")
public class ReservaController {

    @Autowired
    private ReservaRepository repository;

    @Operation(summary = "Listar Reservas")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Listagem de Reservas")
    })
    @GetMapping("/listar")
    @ResponseStatus(HttpStatus.OK)
    public List<Reserva> listar() throws InterruptedException, ExecutionException {
        return repository.listar();
    }

    @Operation(summary = "Listagem de Reservas com joins")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Listagem de Reservas com joins")
    })
    @GetMapping("/listar_join")
    @ResponseStatus(HttpStatus.OK)
    public List<JoinReserva> listar_join() throws IdNotFound, InterruptedException, ExecutionException {
        return repository.listar_join();
    }

    @Operation(summary = "Listar Reserva por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reserva do respectivo ID"),
            @ApiResponse(responseCode = "404", description = "ID não encontrado", content = @Content)
    })
    @GetMapping("/listar_id")
    @ResponseStatus(HttpStatus.OK)
    public Reserva listar(@RequestParam String id) throws InterruptedException, ExecutionException {
        try {
            return repository.listar(id);
        } catch (IdNotFound e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage()
            );
        }
    }

    @Operation(summary = "Listar Reserva por ID com joins")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reserva do respectivo ID com joins."),
            @ApiResponse(responseCode = "404", description = "ID não encontrado", content = @Content)
    })
    @GetMapping("/listar_join_id")
    @ResponseStatus(HttpStatus.OK)
    public JoinReserva listar_join(@RequestParam String id) throws InterruptedException, ExecutionException {
        try {
            return repository.listar_join(id);
        } catch (IdNotFound e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage()
            );
        }
    }

    @Operation(summary = "Criar Reserva")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Reserva criado", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = Reserva.class))}),
            @ApiResponse(responseCode = "400", description = "ID já está em uso", content = @Content),
            @ApiResponse(responseCode = "404", description = "ID Estrangeiro não encontrado", content = @Content)
    })
    @PostMapping("/adicionar")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> adicionar(@RequestBody Reserva obj) throws InterruptedException, ExecutionException {
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

    @Operation(summary = "Alterar Reserva pelo ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reserva alterado", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = Reserva.class))}),
            @ApiResponse(responseCode = "404", description = "ID / ID Estrangeiro não encontrado", content = @Content)
    })
    @PutMapping("/alterar")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, String> alterar(@RequestBody Reserva obj) throws InterruptedException, ExecutionException {
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

    @Operation(summary = "Deletar Reserva por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reserva deletada"),
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

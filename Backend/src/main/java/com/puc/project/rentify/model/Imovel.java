package com.puc.project.rentify.model;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.UUID;

@Data
public class Imovel {
    @Hidden
    private String id;
    @NotBlank
    private double preco_dia;
    @NotBlank
    private String flag_reservado;
    @NotBlank
    private String id_locadora;
    @NotBlank
    private String id_especificacao;
    @NotBlank
    private String id_endereco;

    public Imovel(){
        this.id = UUID.randomUUID().toString();
    }
}

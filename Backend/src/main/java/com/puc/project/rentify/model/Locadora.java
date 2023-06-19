package com.puc.project.rentify.model;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.UUID;

@Data
public class Locadora {
    @Hidden
    private String id;
    @NotBlank
    private String nome_fantasia;
    @NotBlank
    private String cnpj;
    @NotBlank
    private String telefone;
    @NotBlank
    private String id_usuario;
    @NotBlank
    private String id_endereco;

    public Locadora(){
        this.id = UUID.randomUUID().toString();
    }
}

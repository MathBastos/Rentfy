package com.puc.project.rentify.model;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class Locatario {
    @Hidden
    private String id;
    @NotBlank
    private String cpf;
    @NotBlank
    private String celular;
    @NotBlank
    private Date data_nascimento;
    @NotBlank
    private String id_usuario;
    @NotBlank
    private String id_endereco;

    public Locatario(){
        this.id = UUID.randomUUID().toString();
    }
}

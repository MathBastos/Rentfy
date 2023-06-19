package com.puc.project.rentify.model;

import io.swagger.v3.oas.annotations.Hidden;
import lombok.Data;

import java.util.UUID;

@Data
public class Endereco {
    @Hidden
    private String id;
    private String bairro;
    private String cep;
    private String rua;
    private String numero;
    private String complemento;
    private String id_cidade;

    public Endereco(){
        this.id = UUID.randomUUID().toString();
    }
}

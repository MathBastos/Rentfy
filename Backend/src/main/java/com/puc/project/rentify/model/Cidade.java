package com.puc.project.rentify.model;

import io.swagger.v3.oas.annotations.Hidden;
import lombok.Data;

import java.util.UUID;

@Data
public class Cidade {
    @Hidden
    private String id;
    private String nome;
    private String uf;

    public Cidade(){
        this.id = UUID.randomUUID().toString();
    }
}

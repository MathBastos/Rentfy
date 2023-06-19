package com.puc.project.rentify.model;

import io.swagger.v3.oas.annotations.Hidden;
import lombok.Data;

import java.util.UUID;

@Data
public class Especificacao {
    @Hidden
    private String id;
    private String tipo;
    private int num_quartos;
    private int num_banheiros;
    private String varanda;
    private int garagem;
    private String imobiliado;
    private String descricao;

    public Especificacao(){
        this.id = UUID.randomUUID().toString();
    }
}
